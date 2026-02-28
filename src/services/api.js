const BASE_URL=process.env.REACT_APP_BASE_URL


export const categories={

    CATEGORIES_API:BASE_URL + "/course/showAllCategories",
}

export const endpoints={
     SIGNUP_API: BASE_URL + "/auth/signup",
     LOGIN_API:BASE_URL+"/auth/login",
     SENDOTP_API : BASE_URL + "/auth/sendotp",
     RESETPASSWORDTOKEN_API:BASE_URL+"/auth/reset-password-token",
     RESETPASSWORD_API:BASE_URL+"/auth/reset-password",
     checkJwtExpire_API: BASE_URL+"/auth/checkJwtExpired"
 
}


export const settings={
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changepassword",
    UPDATE_DISPLAY_PICTURE_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateprofile",
    DELETE_PROFILE_API:BASE_URL+"/profile/deleteProfile",
    

}
export const contactusEndpoint={
    CONTACT_US_API:BASE_URL+"/contact/contact"
}

export const profileEndpoints={
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getAllEnrolledCourses",
     
}

export const ratingAndReview={
    Get_Average_Rating_API:BASE_URL+"/course/getAverageRating",
    CREATE_RATING:BASE_URL+"/course/createRating",
    FETCH_ALL_RATING_AND_REVIEW:BASE_URL+"/course/getRatingandReviews"
}

export const course={
    Course_Find_API:BASE_URL+"/course/getAllCourses",
    ADD_COURSE_API:BASE_URL+"/course/createcourse",
    EDIT_COURSE_API:BASE_URL+"/course/editCourse",
    EDIT_COURSE_DETAIL_API:BASE_URL+"/course/getfullcoursedetail",
    DELETE_COURSE_API:BASE_URL+"/course/deleteCourse",
    FIND_COURSE_API:BASE_URL+"/course/getcourseDetails",
    FETCH_INSTURCTOR_COURSE:BASE_URL+"/course/getInstructorCourses",
    GET_INSTRUCTOR_DSHBOARD_DATA:BASE_URL+"/course/InstructorDashboardData",
    LECTURE_COMPLETITON_API:BASE_URL+"/course/updateCourseProgress"
}

export const section={
     ADD_SECTION_API:BASE_URL+"/course/addsection",
     DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
     UPDATE_SECTION_API:BASE_URL+"/course/updateSection"
}

export const SubSection={
    CREATE_SUB_SECTION_API:BASE_URL+"/course/addsubSection",
    EDIT_SUB_SECTION_API:BASE_URL+"/course/updateSubSection",
    DELETE_SUB_SECTION_API:BASE_URL+"/course/deleteSubSection"
}

export const Category={
     GET_CATALOG_PAGE:BASE_URL+"/course/getCategoryPageDetails"
}

export const paymentss={
    PAYMENT_CAPTURE_API:BASE_URL+"/payment/capturePayment",
    PAYMENT_SUCCESSFULLY_EMAIL:BASE_URL+"/payment/sendPaymentSuccessEmail",
    VERIFY_PAYMENT_API:BASE_URL+"/payment/verifySignature",
}
