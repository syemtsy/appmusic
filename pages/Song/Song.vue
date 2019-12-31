<template>
	<view>
		<uni-list>
		<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" :title="'播放全部(共'+SongLength+'首)'" @tap="playmusiclist" />
		 <uni-list-item v-bind:title="item.title" v-bind:note="item.note" v-for=" (item,index) in uniListItem" :key="index" @tap="playmusic(index)">
		 </uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components:{
			uniList,
			uniListItem
		},
		data() {
			return {
				uniListItem:[] ,//name,note,songid
				SongLength:0,   //歌单长度
				FavoriteNum:0		//被收藏数
				
			}
		},
		onLoad:function(e){
			console.log(e)
			console.log(this.$store.state.musicApi)
			
			uni.request({
				url: this.$store.state.musicApi+'/playlist/detail?id='+e.id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.playlist.subscribedCount)
					for (let i in res.data.playlist.tracks) {
						this.uniListItem.push({
							title:res.data.playlist.tracks[i].name,
							note:res.data.playlist.tracks[i].ar[0].name+"-"+res.data.playlist.tracks[i].al.name,
							songid:res.data.playlist.tracks[i].id,
							imgUrl:res.data.playlist.tracks[i].al.picUrl,
							musicUrl:""
							
						})
						
					}
					this.SongLength=res.data.playlist.tracks.length
					this.FavoriteNum=res.data.playlist.subscribedCount
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			playmusic(index){
				// console.log(this.$store.state.musicIndex)
				// this.$store.commit({
				// 		type:'setmusicIndex',
				// 		musicIndex:this.$store.state.musicIndex+1
				// })
				// console.log(this.$store.state.musicIndex)
				// this.$store.commit({
				// 	type:'splicemusicList',
				// 	index:this.$store.state.musicIndex,
				// 	musicObj:this.uniListItem[index]
				// })
				// console.log(this.$store.state.musicList)
				// console.log(this.$store.state.musicIndex)
				// uni.navigateTo({
				// 	url: '../playmusic/playmusic',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				this.common.playmusic(index,this.uniListItem)
			},
			playmusiclist(){
				this.common.playmusiclist(this.uniListItem)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';
</style>
