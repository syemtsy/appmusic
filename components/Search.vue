<template>
	<view>
		<uni-search-bar :searchVal="searchVal" @confirm="search" @input="input" @cancel="cancel" cancelButton="none"></uni-search-bar>
		<view v-if="hide==0">
		<h2>热门搜索</h2>
		<view class="example-body">
			<view  class="tag-view" :data-value="index" @click="clickTag(index)" v-for="(index,item) in hots" :key="index">
				<uni-tag  :disabled="true" v-bind:text="index" circle=true size/>
			</view>

		</view>
		</view>
		<view v-if="hide==1">
			<uni-list>
			 <uni-list-item v-bind:title="item.title" v-bind:note="item.note" v-for=" (item,index) in uniListItem" :key="index" @tap="playmusic(index)">
				 
			 </uni-list-item>
			</uni-list>
		
		</view>
		<view>
		</view>
	</view>
	
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"

	export default {
		name:"Search",
		
		components: {
		uniSearchBar,
		uniTag,
		uniSection,
		uniList,
		uniListItem
		},

		data() {
			return {
				
				type: 'default',
				inverted: false,
				hots:[],
				searchVal:'',
				uniListItem:[],
				hide:0,
				res:[]
				
			};
		},
		created(){
			
			uni.request({
				url: this.$store.state.musicApi+'/search/hot',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data.result.hots[0].first)
					
					for (let i in res.data.result.hots) {
						this.hots.push(res.data.result.hots[i].first)
					}
					
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods:{
			playmusic(index){
				console.log(this.uniListItem)
				this.common.playmusic(index,this.uniListItem)
			},
			clickTag(res){
				this.searchVal=res
				uni.request({
					url: this.$store.state.musicApi+'/search?keywords='+res,
					method: 'GET',
					data: {},
					success: res => {
						if(parseInt(res.data.result.songCount)!=0){
							this.hide=1;
							this.uniListItem=[]
							this.uniListItem=[]=res.data.result.songs.map((r,index)=>{
								return{
									title:r.name,
									note:r.artists[0].name+"-"+r.album.name,
									songid:r.id,
									imgUrl:r.artists[0].img1v1Url,
									musicUrl:""
									
								}
							})
							
						}else{
							uni.showToast({
								title: '没有找到歌曲',
								icon: 'none'
							})
						}	
					},
					fail: () => {},
					complete: () => {}
				});
			},
			search(res) {
	
				if(res.value!=''&&res.value!=null){
					uni.request({
						url: this.$store.state.musicApi+'/search?keywords='+res.value,
						method: 'GET',
						data: {},
						success: res => {
							console.log(parseInt(res.data.result.songCount)!=0)
							if(parseInt(res.data.result.songCount)!=0){
								this.hide=1;
								this.uniListItem=[]
								this.uniListItem=[]=res.data.result.songs.map((r,index)=>{
									return{
									title:r.name,
									note:r.artists[0].name+"-"+r.album.name,
									songid:r.id,
									imgUrl:r.artists[0].img1v1Url,
									musicUrl:""
									}
								})
								
							}else{
								uni.showToast({
									title: '没有找到歌曲',
									icon: 'none'
								})
							}							

							
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			input(res) {
				this.searchVal = res.value
				this.res.push(res)
			},
			cancel(res) {
				this.hide=0

			}
		}
	}
</script>

<style>
	.example-body {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 20rpx;
	}
	.tag-view {
		display: flex;
		flex-direction: column;
		margin: 10rpx 15rpx;
		justify-content: center;
	}
</style>
