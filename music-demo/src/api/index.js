import { recommendMusic, newMusic } from '@/api/home'
import { getHotSearch, getResults } from '@/api/search'
import { getLyricById, getSongById } from '@/api/Play'
import { responseWords } from "@/api/chat"
import { userRegester, userLogin, getUserInfo, updateUsername, updatePassword } from '@/api/users'
import { addHistory, getHistory } from '@/api/visitHistory'

export const recommendMusicAPI = recommendMusic

export const newMusicAPI = newMusic

//导出获取热搜关键词api
export const hotSearchAPI = getHotSearch

//导出获取搜索结果api
export const searchResultsAPI = getResults

export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById

//导出chat api
export const responseWordsAPI = responseWords

//导出用户模块相关API
export const userRegesterAPI = userRegester
export const userLoginAPI = userLogin
export const getUserInfoAPI = getUserInfo
export const updateUsernameAPI = updateUsername
export const updatePasswordAPI = updatePassword

//导出历史记录相关API
export const addHistoryAPI = addHistory
export const getHistoryAPI = getHistory