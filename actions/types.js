/**
 * APP Types
 */
export const ASSETS_LOADED = 'assets_loaded'
export const ASSETS_LOADED_FAIL = 'assets_loaded_fail'
export const SPEAKER_SEARCH = 'speaker_search'
export const SPEAKER_FILTER = 'speaker_filter'
export const SPEAKERS_LIST_EXPAND = 'speakers_list_expand'
export const SPEAKERS_LIST_COLLAPSE = 'speakers_list_collapse'
export const SCHEDULE_LIST_EXPAND = 'schedule_list_expand'
export const SCHEDULE_LIST_COLLAPSE = 'schedule_list_collapse'

/**
 * LOGIN Types
 */
// Facebook Login
export const FB_LOGIN_SUCCESS = 'fb_login_success'
export const FB_LOGIN_FAIL = 'fb_login_fail'
export const FB_LOGIN_USER = 'fb_login_user'

// Firebase Login
export const INPUT_EMAIL = 'input_email'
export const INPUT_PASSWORD = 'input_password'
export const FIREBASE_LOGIN_SUCCESS = 'firebase_login_success'
export const FIREBASE_LOGIN_FAIL = 'firebase_login_fail'
export const FIREBASE_LOGIN_USER = 'firebase_login_user'
export const FIREBASE_LOGOUT_USER = 'firebase_logout_user'

// App Login
export const LOGIN_USER = 'app_login_user'
export const LOGIN_USER_SUCCESS = 'app_login_success'
export const LOGIN_USER_FAIL = 'app_login_fail'
export const LOGOUT_SUCCESS = 'app_logout_success'
export const PROFILE_LOAD = 'profile_load'

/**
 * USER Types
 */
export const SET_AUTHED_USER = 'set_authed_user'

export const PROFILE_FIELD_UPDATE = 'profile_field_update'
export const PROFILE_SAVE = 'profile_save'
export const PROFILE_FETCH_SUCCESS = 'profile_fetch_success'
export const PROFILE_FETCH_FAIL = 'profile_fetch_fail'
export const USER_CREATE = 'user_create'
export const USER_UPDATE = 'user_update'
export const USER_FETCH_SUCCESS = 'user_fetch_success'
export const USER_SAVE_SUCCESS = 'user_save_success'

export const SPEAKER_LIKE = 'speaker_like'
export const SPEAKER_DISLIKE = 'speaker_dislike'