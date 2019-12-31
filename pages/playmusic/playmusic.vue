<template>
	<view>
		<view class="topbody">
			<text>{{title}}</text>
			<text>{{note}}</text>
			<image :src="imgUrl" mode="aspectFit"></image>
		</view>
		<view class="flexdding"></view>
		<view class="flexd">
			<view class="progress-flex">
				<view >{{starttime}} </view>
		            <view class="progress-box">
		                <progress :percent="percent" stroke-width="2" activeColor="#31C27C" backgroundColor="#989393" />
		            </view>
				<view >{{endtime}}</view>
			</view>
		<view>
			<uni-grid :column="5"   :showBorder="false" :highlight="false"  >
			    <uni-grid-item>
					<image class="grid-image"   
							@tap="Playswitch"
							:src="
			                mode === 1
			                    ? require('../../static/play_icn_one.png')
			                    : mode === 2
			                    ? require('../../static/play_icn_loop.png')
			                    : require('../../static/play_icn_shuffle.png')
			            " mode="aspectFit" >
					</image>
			    </uni-grid-item>
				<uni-grid-item>
					<image class="grid-image"
					  @tap="PreviousSong"
					  :src="require('../../static/play_btn_prev.png')"  mode="aspectFit" >
					</image>
				</uni-grid-item>
				<uni-grid-item>
					<image class="grid-image" 
						@tap="PlayOrPaused"
			            :src="
			                audio_paused===true
			                    ? require('../../static/play_btn_play.png')
			                    : require('../../static/play_btn_pause.png')
			            "
						mode="aspectFit" >
					</image>
				</uni-grid-item>
				<uni-grid-item>
					<image class="grid-image"
					 @tap="nextSong"
					 :src="require('../../static/play_btn_next.png')" mode="aspectFit" >
					</image>
				</uni-grid-item>
				<uni-grid-item>
					<image class="grid-image" 
					@tap="projectionList"
					:src="require('../../static/play_icn_src.png')" mode="aspectFit" >
					</image>
				</uni-grid-item>
			</uni-grid>
		</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view>
					<view class="playtitle">播放列表</view>
			        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			                @scroll="scroll">
						
						<view class="title" v-for=" (item,index) in musicList" v-bind:style="{color: index===Audio_index?green:white}" @tap="playit(index)">{{item.title}}
						<view class="note">{{item.note}}</view>
						</view>	
			        </scroll-view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniPopup
		},
		computed:{
			title(){
				return this.$store.state.musicList[this.$store.state.musicIndex].title
			},
			note(){
				return this.$store.state.musicList[this.$store.state.musicIndex].note
			},
			imgUrl(){
				return this.$store.state.musicList[this.$store.state.musicIndex].imgUrl
			},
			mode(){
				return this.$store.state.mode
			},
			musicList(){
				return this.$store.state.musicList
			},Audio_index(){
				return this.$store.state.musicIndex
			}
		},
		data() {
			return {
            sliderValue: 0, //进度条当前位置,0~100
            show: false, //控制播放列表是否显示
            audio_paused: false,
			starttime:"",
			endtime:"",
			percent:0,
			green:"#68BF80",
			white:'#EDECE8'
			}
		},
		onLoad(e) {
			console.log(this.$store.state.InnerAudioContext.autoplay)
			//初始化对象
			if(this.$store.state.InnerAudioContext.autoplay==false||this.$store.state.InnerAudioContext.autoplay==null){
				this.$store.state.InnerAudioContext.autoplay=true;
				
			}
			console.log(this.$store.state.InnerAudioContext.autoplay)
			this.common.getMusicUrl()
			console.log(this.$store.state.InnerAudioContext.src)
			console.log(this.$store.state.InnerAudioContext.src=="")


			this.$store.state.InnerAudioContext.onPlay(() => {
				console.log("播放事件")
				console.log(this.$store.state.InnerAudioContext.src)
				
			});
			this.$store.state.InnerAudioContext.onPause(() => {
				console.log("暂停")
				console.log(this.$store.state.InnerAudioContext.src)
			});
			this.$store.state.InnerAudioContext.onStop(() => {
				console.log("音频停止事件")
				console.log(this.$store.state.InnerAudioContext.src)
			});
			this.$store.state.InnerAudioContext.onTimeUpdate(() => {
				// console.log('音频更新事件')	
				this.endtime=this.common.Secondstotime(parseInt(this.$store.state.InnerAudioContext.duration))
				this.starttime= this.common.Secondstotime(parseInt(this.$store.state.InnerAudioContext.currentTime))
				this.percent=parseInt(100*this.$store.state.InnerAudioContext.currentTime/this.$store.state.InnerAudioContext.duration)
			// console.log(parseInt(100*this.$store.state.InnerAudioContext.currentTime/this.$store.state.InnerAudioContext.duration) )
				
				// console.log(this.common.Secondstotime(parseInt(this.$store.state.InnerAudioContext.currentTime)))
				// console.log(this.common.Secondstotime(parseInt(this.$store.state.InnerAudioContext.duration)))
			});
			this.$store.state.InnerAudioContext.onEnded(() => {
				console.log("音频自然播放结束事件")
				if(this.$store.state.mode==0){
					console.log('随机播放')
					this.$store.commit({
						type:'setmusicIndex',
						musicIndex:parseInt(Math.random()*this.$store.state.musicList.length) 
					})
				}
				if(this.$store.state.mode==1){
					console.log('单曲循环')
				}
				if(this.$store.state.mode==2){
					console.log('列表循环')
					this.$store.commit({
						type:'setmusicIndex',
						musicIndex:(this.$store.state.musicIndex+1)%this.$store.state.musicList.length
					})
				}
				this.common.getMusicUrl()
			});
			this.$store.state.InnerAudioContext.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});
			
		},
		methods: {
			Playswitch(){			//单曲OR随机OR顺序
				this.$store.commit({
					type:'setmode',
					mode:(this.$store.state.mode+1)%3
				})
				console.log(this.$store.state.mode)
				if(this.$store.state.mode==0){
					console.log('随机播放')
					uni.showToast({
						title: '随机播放',
						icon: 'none'
					})
				}
				if(this.$store.state.mode==1){
					console.log('单曲循环')
					uni.showToast({
						title: '单曲循环',
						icon: 'none'
					})
				}
				if(this.$store.state.mode==2){
					console.log('列表循环')
					uni.showToast({
						title: '列表循环',
						icon: 'none'
					})
				}
			},
			PreviousSong(){
				console.log("上一首")
				if(this.$store.state.musicIndex!=0){
					if(this.$store.state.mode==0){
						console.log('随机播放')
						this.$store.commit({
							type:'setmusicIndex',
							musicIndex:parseInt(Math.random()*this.$store.state.musicList.length) 
						})
					}
					if(this.$store.state.mode==1){
						console.log('单曲循环')
						this.$store.commit({
							type:'setmusicIndex',
							musicIndex:this.$store.state.musicIndex-1
						})
					}
					if(this.$store.state.mode==2){
						console.log('列表循环')
						this.$store.commit({
							type:'setmusicIndex',
							musicIndex:(this.$store.state.musicIndex-1)%this.$store.state.musicList.length
						})
					}
					// this.$store.commit({
					// 		type:'setmusicIndex',
					// 		musicIndex:this.$store.state.musicIndex-1
					// })
					uni.showToast({
						title: '上一首',
						icon: 'none'
					})
					
				}else{
					uni.showToast({
						title: '已经没有上一首了哦',
						icon: 'none'
					})
				}
				//设置当前播放的url
				this.common.getMusicUrl()
			},
			nextSong(){

				console.log(this.$store.state.musicList+":"+this.$store.state.musicIndex+":"+this.$store.state.InnerAudioContext.src)
				if(this.$store.state.musicIndex!=this.$store.state.musicList.length-1){
				if(this.$store.state.mode==0){
					console.log('随机播放')
					this.$store.commit({
						type:'setmusicIndex',
						musicIndex:parseInt(Math.random()*this.$store.state.musicList.length) 
					})
				}
				if(this.$store.state.mode==1){
					console.log('单曲循环')
					this.$store.commit({
						type:'setmusicIndex',
						musicIndex:this.$store.state.musicIndex+1
					})
				}
				if(this.$store.state.mode==2){
					console.log('列表循环')
					this.$store.commit({
						type:'setmusicIndex',
						musicIndex:(this.$store.state.musicIndex+1)%this.$store.state.musicList.length
					})
				}
					uni.showToast({
						title: '下一首',
						icon: 'none'
					})
				}else{
					uni.showToast({
						title: '已经没有下一首了哦',
						icon: 'none'
					})
				}
				//设置当前播放的url
				this.common.getMusicUrl()
			},
			PlayOrPaused(){			//播放OR暂停
				this.audio_paused=this.audio_paused?false:true;
				if(this.audio_paused==true){
					this.$store.state.InnerAudioContext.pause();
					uni.showToast({
						title: '暂停',
						icon: 'none'
					})
				}else{
					
					this.$store.state.InnerAudioContext.play();
					uni.showToast({
						title: '播放',
						icon: 'none'
					})
				}
			},
			projectionList(){
				console.log("弹出播放列表")
				this.$refs.popup.open()

			},
			playit(index){
				this.$store.commit({
					type:'setmusicIndex',
					musicIndex:index
				})
				this.common.getMusicUrl()
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #5F5251;
	}
	.grid-image{
		width: 150rpx;
		padding: 2rpx;
	}
	.topbody{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		font-size:18px;
		color: #FFFFFF;
		
	}
	.popup{
		height: 360rpx;
		font-size: 18px;
		color: #FFFFFF;
	}
	.scroll-Y{
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		
	}
	.title{
		color:#FFFFFF;
		font-size: 14px;
		
	}
	.note{
		color: #333333;
		font-size: 10px;
	}
	.flexd{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.progress-box{
		width: 480rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.progress-flex{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		color: #C2BFBF;
	}
	.playtitle{
		color:#FFFFFF;
		font-size: 14px;
		text-align: center;
		
	}
	.flexdding{
		
	}
</style>
