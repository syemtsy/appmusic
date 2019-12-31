import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
	state:{
		musicApi:"http://192.168.123.79:3000",
		InnerAudioContext:uni.createInnerAudioContext(),
		musicList:[],
		musicIndex:-1,
		mode:2
	},
	mutations:{
		setmusicList(state,payload){
			state.musicList=payload.musicList.map(m=>{
				return{
				title:m.title,
				note:m.note,
				songid:m.songid,
				imgUrl:m.imgUrl,
				musicUrl:""
				}
			})
		},
		splicemusicList(state,payload){
			state.musicList.splice(payload.index,0,payload.musicObj)
		},
		setmusicIndex(state,payload){
			state.musicIndex=payload.musicIndex
		},
		setmusicApi(state,payload){
			state.musicApi=payload.musicApi
		},
		setmode(state,payload){
			state.mode=payload.mode
		}
	}
})


export default store
