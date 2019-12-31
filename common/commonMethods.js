import store from '@/store/index.js'

 export default {
	Secondstotime(second){
		//数字补全,不足补零
	var	secondtime =("0"+ parseInt(second%60)).slice(-2)
	var	Minute=("0"+ parseInt(second/60)).slice(-2)
	// var	Minute=(Array(2).join('0') + second/60).slice(-2)
		return Minute+":"+secondtime
		
	},
	playmusic(index,nuiList){
			store.commit({
					type:'setmusicIndex',
					musicIndex:store.state.musicIndex+1
			})
			store.commit({
				type:'splicemusicList',
				index:store.state.musicIndex,
				musicObj:nuiList[index]
				})
			console.log(store.state.musicList)
			console.log(store.state.musicIndex)
			uni.navigateTo({
				url: '../playmusic/playmusic',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
	},
	playmusiclist(nuiList){
			store.commit({
					type:'setmusicIndex',
					musicIndex:0
			})
			store.commit({
				type:'setmusicList',
				musicList:nuiList
				})
			console.log(store.state.musicList)
			console.log(store.state.musicIndex)
			uni.navigateTo({
				url: '../playmusic/playmusic',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
	},
	getMusicUrl(){
		
		//根据index 检测是否有musicUrl，没有就请求并添加
		console.log(store.state.musicList)
		if(store.state.musicList[store.state.musicIndex].musicUrl==''){
			uni.request({
				url: store.state.musicApi+'/song/url?id='+store.state.musicList[store.state.musicIndex].songid,
				method: 'GET',
				data: {},
				success: res => {
					
					if(res.data.data[0].url!=null){
						store.state.musicList[store.state.musicIndex].musicUrl=res.data.data[0].url
						store.state.InnerAudioContext.src=store.state.musicList[store.state.musicIndex].musicUrl
					}else{
						store.state.InnerAudioContext.src=""
						if(store.state.InnerAudioContext.src==""){
							uni.showToast({
								title: '这首歌曲无法播放',
								icon: 'none'
							})
						}
					}

				},
				fail: () => {},
				complete: () => {}
			});
		}else{
			store.state.InnerAudioContext.src=store.state.musicList[store.state.musicIndex].musicUrl
		}
				console.log(store.state.InnerAudioContext.src)
	}
	
 }