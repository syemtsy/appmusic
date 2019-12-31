<template>
	<view>
	<view class="viewbackground">
		<image src="http://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28%E2%80%A6=" class="image" mode="aspectFill"></image>
		<text>更新日期</text>
		<text>12月19日</text>
	</view>
		<uni-list>
	    <uni-list-item v-bind:title="item.title" v-bind:note="item.note" v-for=" (item,index) in uniListItem" :key="index" @tap="playmusic(index)"></uni-list-item>
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
		name:"PopularSong",
		data() {
			return {
				uniListItem:[
					//title,note,songid,imgUrl,musicUrl
				]
			};
		},
		created() {
			uni.request({
				url: this.$store.state.musicApi+'/top/list?idx=1',
				method: 'GET',
				data: {},
				success: res => {
					this.uniListItem=res.data.playlist.tracks.map(list=>{
						return{
							title:list.name,
							note:list.ar[0].name+"-"+list.al.name,
							songid:list.id,
							imgUrl:list.al.picUrl,
							musicUrl:""
						}
					})
					console.log(this.uniListItem)
				},
				fail: () => {},
				complete: () => {}
			});
			
		},
		methods:{
			playmusic(index){
				console.log(index)
				this.common.playmusic(index,this.uniListItem)
			}
		}
	}
</script>


<style lang="scss">
	@import '@/common/uni-nvue.scss';
	.viewbackground{
		width: 750rpx;
		height: 264rpx;
		background-image: url("http://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252%E2%80%A6=");
		display: flex;
		flex-direction: column ; 
		justify-content:center;
		padding-left: 50rpx;
		color: #FFFFFF;
	}
	.image{
		width: 257rpx;
		
		
	}
</style>
