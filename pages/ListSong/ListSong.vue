<template>
	<view>
		<uni-list>
		<uni-list-item :title="title"></uni-list-item>
		</uni-list>
		<uni-grid :column="3" @change="change" >
		    <uni-grid-item v-for="(item,index) in music" :key="index" >
				<image class="grid-image" :src="item.imageUrl" mode="aspectFit" >
				</image>
		    </uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			uniList,
			uniListItem,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				music:[]  ,//imageurl name id,
				title:"",
				square:false,
				showBorder:false
			}
		},
		onLoad:function(e){
			console.log(e.title)
			console.log(e.title=="推荐歌单")
			console.log(e.title=="排行榜")
			this.title=e.title;
			if(e.title=="排行榜"){
				uni.request({
					url: this.$store.state.musicApi+'/toplist',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res.data.list)
						for (let i = 0; i < res.data.list.length; i++) {
							this.music.push({
								name:res.data.list[i].name,
								imageUrl:res.data.list[i].coverImgUrl,
								id:res.data.list[i].id
							})
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
			if(e.title=="推荐歌单"){
				uni.request({
					url: this.$store.state.musicApi+'/personalized',
					method: 'GET',
					data: {},
					success: res => {
						for (let i in res.data.result) {
							this.music.push({
								imageUrl:res.data.result[i].picUrl,
								name:res.data.result[i].name,
								id:res.data.result[i].id
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			}


		},
		methods: {
			change(e) {

					let {
						index
					} = e.detail
					this.music[index].badge && this.music[index].badge++
					console.log(this.music[index].id)
					uni.navigateTo({
						url: '../Song/Song?id='+this.music[index].id,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';
	.grid-image{
			width: 245rpx;
			padding: 2rpx;
		}
	
	.uni-grid-item{
		height: 300rpx;
	}
</style>
