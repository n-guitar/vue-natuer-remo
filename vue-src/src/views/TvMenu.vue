<template>
    <div>
<!-- メニュータイトル -->
        <v-row>
            <v-col cols="12" class="pa-4">
                <div class="text-h5">
                    TV Menu
                </div>
            </v-col>
        </v-row>
        <v-divider></v-divider>
<!-- end メニュータイトル -->
    <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        color="cyan"
    ></v-progress-linear>
    <v-tabs v-model="tab">
        <v-tab v-for="appliance in tvList" :key="appliance.id">
            {{appliance.nickname}}
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item v-for="appliance in tvList" :key="appliance.id">
            <v-btn
            @click="sendSignal(appliance.id, button.name)"
            v-for="button in appliance.tv.buttons" :key="button.name" class="ma-4">
                {{button.name}}
            </v-btn>
        </v-tab-item>
    </v-tabs-items>
    </div>
</template>

<script>
export default {
    data(){
        return {
            token: "",
            appliancesList: [],
            device:"",
            tab: null,
            tvList: [],
            progress: false,
        }
    },
    created(){
        if(this.$store.state.token.length > 0){
            this.token = this.$store.state.token
            this.tokenSet = true
            this.appliancesList = this.$store.state.appliancesList["payload"]
            this.setTvList(this.appliancesList)
            this.device = this.$store.state.device["payload"]
            console.log("[OtherMenu][created]this.token:",this.token)
        } else {
            console.log("please set your token")
        }
    },
    methods:{
        setTvList(appliancesList){
            this.tvList = []
            for (let i in appliancesList){
                console.log("appliancesList[i]",appliancesList[i])
                if (appliancesList[i].type === 'TV'){
                    this.tvList.push(appliancesList[i])
                } else {
                    //
                }
            }
        },
        async sendSignal(id, buttonName){
            this.progress = true
            let params = "button=" +  buttonName
            let sendUrl = this.$store.state.baseUrl + "1/appliances/" + id + "/tv"
            console.log("send signal", sendUrl)
            const response = await fetch(sendUrl, {
                method: "POST",
                body: params,
                headers: {
                accept: "application/json",
                Authorization: "Bearer " + this.$store.state.token,
                "Content-Type": "application/x-www-form-urlencoded"
                },

            })
            .then((response) => response.json())
            .then((data) => {
                this.progress = false
                console.log("data:",data)
            })
            console.log("response:",response)
        }
    },
}
</script>

<style>

</style>