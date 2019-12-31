<template>
	<view>
			<view class="flexd"></view>
			<uni-nav-bar  right-text="设置" title="musictest" @clickRight="SettingApi"	></uni-nav-bar>
			<sun-tab :value.sync="index" @change="objectChange" :tabList="tabObjectList" rangeKey="name"></sun-tab>
			<hFormAlert v-if="cancelShow"  title="更换api" name="cancel_desc" placeholder="请输入取消" :value="musicApi" @confirm="confirm" @cancel="cancel"></hFormAlert>
			<recommend v-if="index==0"></recommend>
			<PopularSong v-if="index==1"></PopularSong>
			<Search v-if="index==2"></Search>
	</view>
	 
</template>

<script>
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	    import sunTab from '@/components/sun-tab/sun-tab.vue'
		import recommend from '@/components/recommend.vue'
		import PopularSong from '@/components/PopularSong.vue'
		import Search from '@/components/Search.vue'
	export default {
        components: {
			hFormAlert,
			uniNavBar,
			sunTab,
			recommend,
			PopularSong,
			Search
        },
		data() {
			return {
				cancelShow:false,
				title: 'Hello World',
                index: 0,
				tabObjectList: [ //对象数组赋值
                    {
                        name: '推荐',
                        value: 1
                    },
                    {
                        name: '热歌榜',
                        value: 2
                    },
                    {	name: '搜索',
                        value: 3
                    }
                ],

			}
		},
		computed:{
			musicApi:function (){
				return this.$store.state.musicApi
			}
		},
		onLoad() {
			console.log(this.$store.state.musicApi)
		},
		methods: {
		cancel(){
			this.cancelShow=false
		},
		confirm(res){
			console.log(res.cancel_desc)
				this.$store.commit({
					type:'setmusicApi',
					musicApi:res.cancel_desc
				})
				this.cancelShow=false
				console.log(this.$store.state.musicApi)
				},
		SettingApi(){
			this.cancelShow=true
			},
		arrayChange(e){
			                console.log('数组数据返回格式');
			                
			            },
						
		objectChange(e){
						console.log('对象数据返回格式');
						
						 console.log(e);
						 console.log(this.index);
						},
        change(e) {
            this.current = e.detail.current;
        }
		}
	}
</script>

<style>
	uni-nav-bar{
	    background-color: #0077AA;
	    color: rgb(0, 0, 0);
		font-size: 18px;
	}
	.flexd{
		height: 50rpx;
	}
</style>
