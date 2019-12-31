
		<template>
			<view>
					<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
						<swiper class="swiper-box" @change="change">
							<swiper-item v-for="(item, index) in info" :key="index">
								<view :class="item.colorClass" class="swiper-item">
									<image class="image" :src="item.url" mode="aspectFill" />
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
					<uni-list>
					<uni-list-item title="推荐歌单" @tap="openSonglist"></uni-list-item>
					</uni-list>
					<uni-grid :column="3"  @change="gridchange" >
					    <uni-grid-item v-for="(item,index) in grid" :key="index">
							<image class="grid-image" :src="item.url" mode="aspectFit" >
							</image>
					    </uni-grid-item>
					</uni-grid>
					<uni-list>
					<uni-list-item title="排行榜" @tap="opentopList"></uni-list-item>
					</uni-list>
					<uni-grid :column="3" @change="toplistchange" >
					    <uni-grid-item v-for="(item,index) in toplist">
							<image class="grid-image" :src="item.url" mode="aspectFit" >
							</image>
					    </uni-grid-item>
					</uni-grid>
					

			</view>
		</template>
<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		name:"recommend",
		components: {
			uniSwiperDot,
			uniList,
			uniListItem,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				cancelShow:false,
				info: [
						
								// {
					   //              url: 'http://p1.music.126.net/9vFiVSkRvIaM_okuDAadEw==/109951164569694997.jpg',
					   //              content: '内容 A'
					   //          },
								],
					grid:[],
					toplist:[],
					current: 0,
					dotsStyles:{
						backgroundColor:'#fff',
						bottom:10,
						selectedBackgroundColor:'#ff0000'
						},
					square:false,
					showBorder:true,
					mode: 'round'
				
			}
		},
		created() {
			uni.request({
				url: this.$store.state.musicApi+'/banner',
				sslVerify:false,
				method: 'GET',
				data: {
					type:1
				},
				success: res => {
					for (let index in res.data.banners) {
						this.info.push({
							url:res.data.banners[index].pic,
							content:index
						})
						
					}
					
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.$store.state.musicApi+'/personalized',
				method: 'GET',
				data: {},
				success: res => {
					for (let i = 0; i < 6; i++) {
						this.grid
						.push({
							playCount:res.data.result[i].playCount, //累计听歌数
							name:res.data.result[i].name,
							url:res.data.result[i].picUrl,
							id:res.data.result[i].id
						})
					}
					
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.$store.state.musicApi+'/toplist',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.list)
					for (let i = 0; i < 6; i++) {
						this.toplist.push({
							name:res.data.list[i].name,
							url:res.data.list[i].coverImgUrl,
							id:res.data.list[i].id
						})
						
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			toplistchange(e){
				let {
					index
				} = e.detail
				this.toplist[index].badge && this.toplist[index].badge++
				console.log(this.toplist[index].id)
				uni.navigateTo({
					url: '../Song/Song?id='+this.toplist[index].id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gridchange(e){
				let {
					index
				} = e.detail
				this.grid[index].badge && this.grid[index].badge++
				console.log(this.grid[index].id)
				uni.navigateTo({
					url: '../Song/Song?id='+this.grid[index].id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			openSonglist(){
				uni.navigateTo({
					url: '../ListSong/ListSong?title='+'推荐歌单',
				});
			
			},
			opentopList(){
				uni.navigateTo({
					url: '../ListSong/ListSong?title='+'排行榜',
				});
			
			}
		}
	}
</script>


<style lang="scss">
	@import '@/common/uni-nvue.scss';
	.swiper-box {
		height: 500rpx;
	}
	.image {
		width: 750rpx;
		
	}
	.grid-image{
		width: 245rpx;
		padding: 2rpx;
	}

.uni-grid-item{
	height: 300rpx;
}
</style>
