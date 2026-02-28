import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import IconBtn from "../../common/IconBtn"
import { AiFillPlayCircle } from "react-icons/ai"
import { MarkLectureCompletion } from '../../../services/operation/CourseApi';
import { setCompletedVideo } from '../../../slices/ViewCourse';

const VideoDetail = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playRef = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const { token } = useSelector((state) => state.auth)
  const { SectionData, CompletedVideo } = useSelector((state) => state.ViewCourse);

  // Get current section object
  const currentSection = SectionData?.find(section => section._id === sectionId);

  useEffect(() => {
    if (!SectionData?.length || !courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const filterData = SectionData.filter(section => section._id === sectionId);
    const videoFilterData = filterData?.[0]?.subSection.filter(sub => sub._id === subSectionId);
    setVideoData(videoFilterData?.[0]);
  }, [SectionData, courseId, sectionId, subSectionId, location.pathname, navigate]);

  const currentSectionIndex = SectionData?.findIndex(sec => sec._id === sectionId);
  const currentSubSectionIndex = SectionData?.[currentSectionIndex]?.subSection?.findIndex(sub => sub._id === subSectionId);

  const isFirstVideo = () => currentSectionIndex === 0 && currentSubSectionIndex === 0;
  const isLastVideo = () => currentSectionIndex === SectionData.length - 1 &&
    currentSubSectionIndex === SectionData?.[currentSectionIndex]?.subSection.length - 1;

  const goToNextVideo = () => {
    if (currentSubSectionIndex < SectionData[currentSectionIndex].subSection.length - 1) {
      const nextSubSectionId = SectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else if (currentSectionIndex < SectionData.length - 1) {
      const nextSectionId = SectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = SectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const gotoPrevVideo = () => {
    if (currentSubSectionIndex > 0) {
      const prevSubSectionId = SectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else if (currentSectionIndex > 0) {
      const prevSectionId = SectionData[currentSectionIndex - 1]._id;
      const prevSubSectionId = SectionData[currentSectionIndex - 1].subSection.slice(-1)[0]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await MarkLectureCompletion({ courseId, subsectionId: subSectionId }, token);
    if (res) dispatch(setCompletedVideo(subSectionId));
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <div>Video Not Found</div>
      ) : (
        <div>
          <Player
            ref={playRef}
            aspectRatio="4:3"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <AiFillPlayCircle className='' />
          </Player>

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!CompletedVideo?.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading"}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playRef?.current) {
                    playRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="ReWatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && <button onClick={gotoPrevVideo}>Prev</button>}
                {!isLastVideo() && <button onClick={goToNextVideo}>Next</button>}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-3xl font-semibold">{currentSection?.sectionName}</p>
      <p className='pt-2 pb-6'>{currentSection?.description}</p>
    </div>
  )
}

export default VideoDetail;