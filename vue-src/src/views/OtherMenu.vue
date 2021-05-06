<template>
    <div>
<!-- メニュータイトル -->
        <v-row>
            <v-col cols="12" class="pa-4">
                <div class="text-h5">
                    Other Menu
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
<!-- test -->
<br>
    <v-tabs v-model="tab">
        <v-tab v-for="appliance in othersList" :key="appliance.id">
            {{appliance.nickname}}
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item v-for="appliance in othersList" :key="appliance.id">
            <v-btn @click="sendSignal(signal.id)" v-for="signal in appliance.signals" :key="signal.id" class="ma-4">
                {{signal.name}}
            </v-btn>
        </v-tab-item>
    </v-tabs-items>
<!-- end test -->
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
            othersList: [],
            progress: false,
        }
    },
    created(){
        if(this.$store.state.token.length > 0){
            this.token = this.$store.state.token
            this.tokenSet = true
            this.appliancesList = this.$store.state.appliancesList["payload"]
            this.setOtherList(this.appliancesList)
            this.device = this.$store.state.device["payload"]
            console.log("[OtherMenu][created]this.token:",this.token)
        } else {
            console.log("please set your token")
        }
    },
    methods:{
        setOtherList(appliancesList){
            this.othersList = []
            for (let i in appliancesList){
                console.log("appliancesList[i]",appliancesList[i])
                if (appliancesList[i].type === 'IR'){
                    this.othersList.push(appliancesList[i])
                } else {
                    //
                }
            }
        },
        async sendSignal(signal){
            this.progress = true
            let sendUrl = this.$store.state.baseUrl + "1/signals/" + signal + "/send"
            console.log("send signal", sendUrl)
            const response = await fetch(sendUrl, {
                method: "POST",
                headers: {
                accept: "application/json",
                Authorization: "Bearer " + this.$store.state.token,
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