<template>
    <div>
<!-- メニュータイトル -->
        <v-row>
            <v-col cols="12" class="pa-4">
                <div class="text-h5">
                    Air Menu
                </div>
            </v-col>
        </v-row>
        <v-divider color="success"></v-divider>
<!-- end メニュータイトル -->
    <v-progress-linear
        :active="progress"
        :indeterminate="progress"
        color="cyan"
    ></v-progress-linear>
    <v-tabs v-model="tab">
        <v-tab v-for="appliance in airList" :key="appliance.id">
            {{appliance.nickname}}
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pb-4">
        <v-tab-item v-for="appliance in airList" :key="appliance.id">
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="py-1">
                            <div>
                                Power
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-row>
                                    <v-col>
                                        <v-btn class="mx-4" @click="sendSignal(appliance.id, {button:'on'})">
                                            <v-icon color="green">mdi-power</v-icon>
                                            ON
                                        </v-btn>
                                    <v-col>
                                    </v-col>
                                        <v-btn class="mx-4" @click="sendSignal(appliance.id, {button:'power-off'})">
                                            <v-icon color="red">mdi-power</v-icon>
                                            OFF
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title class="py-1">
                            <div>
                                Temperature
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-divider class="py-2"></v-divider>
                            <v-card-actions class="justify-center">
                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="airTemp" append-outer-icon="mdi-temperature-celsius">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn class="mx-4" @click="sendSignal(appliance.id, {temperature:'plus'})">
                                            <v-icon color="red">mdi-arrow-up-thick</v-icon>
                                            UP
                                        </v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn class="mx-4" @click="sendSignal(appliance.id, {temperature:'minus'})">
                                            <v-icon color="blue">mdi-arrow-down-thick</v-icon>
                                            DOWN
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="ma=2">
                        <v-card-title class="py-1">
                            <div>
                                Mode
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-divider class="py-2"></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {operation_mode:'mode-auto'})">
                                    <v-icon color="teal">mdi-car</v-icon>
                                    auto
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {operation_mode:'mode-blow'})">
                                    <v-icon color="blue-grey">mdi-weather-windy</v-icon>
                                    blow
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {operation_mode:'mode-cool'})">
                                    <v-icon color="blue">mdi-snowflake</v-icon>
                                    cool
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {operation_mode:'mode-dry'})">
                                    <v-icon color="cyan">mdi-water-off-outline</v-icon>
                                    dry
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {operation_mode:'mode-warm'})">
                                    <v-icon color="red">mdi-fire</v-icon>
                                    warm
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="ma=2">
                        <v-card-title class="py-1">
                            <div>
                                Air Volume
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-divider class="py-2"></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-auto'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    auto
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-1'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    1
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-2'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    2
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-3'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    3
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-4'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    4
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-5'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    5
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_volume:'vol-6'})">
                                    <v-icon color="indigo">mdi-speaker</v-icon>
                                    6
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="ma=2">
                        <v-card-title class="py-1">
                            <div>
                                Direction
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-divider class="py-2"></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-auto'})">
                                    <v-icon color="blue-grey">mdi-fan</v-icon>
                                    auto
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-swing'})">
                                    <v-icon color="blue-grey">mdi-fan</v-icon>
                                    awing
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-1'})">
                                    <v-icon color="blue-grey">mdi-fan-plus</v-icon>
                                    1
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-2'})">
                                    <v-icon color="blue-grey">mdi-fan-plus</v-icon>
                                    2
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-3'})">
                                    <v-icon color="blue-grey">mdi-fan-plus</v-icon>
                                    3
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-4'})">
                                    <v-icon color="blue-grey">mdi-fan-plus</v-icon>
                                    4
                                </v-btn>
                                <v-btn class="mx-4" @click="sendSignal(appliance.id, {air_direction:'dir-5'})">
                                    <v-icon color="blue-grey">mdi-fan-plus</v-icon>
                                    5
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
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
            airList: [],
            progress: false,
            airTemp: ""
        }
    },
    created(){
        if(this.$store.state.token.length > 0){
            this.token = this.$store.state.token
            this.tokenSet = true
            this.appliancesList = this.$store.state.appliancesList["payload"]
            this.setAirList(this.appliancesList)
            this.device = this.$store.state.device["payload"]
            if(this.$store.state.airTemp.length){
                this.airTemp = this.$store.state.airTemp
            } else {
                this.airTemp = 26
            }
            console.log("[OtherMenu][created]this.token:",this.token)
        } else {
            console.log("please set your token")
        }
    },
    methods:{
        getAirTemp(id){
            console.log("getAirTemp",id)
            for (let i in this.appliancesList){
                if(this.appliancesList[i]["id"] === id){
                    console.log(this.appliancesList[i]["settings"]["temp"])
                    this.airTemp = this.appliancesList[i]["settings"]["temp"]
                    this.$store.state.airTemp = this.appliancesList[i]["settings"]["temp"]
                }
            }

        },
        setAirList(appliancesList){
            this.airList = []
            for (let i in appliancesList){
                console.log("appliancesList[i]",appliancesList[i])
                if (appliancesList[i].type === 'AC'){
                    this.airList.push(appliancesList[i])
                } else {
                    //
                }
            }
        },
        async sendSignal(id, params){
            this.progress = true
            let paramsKey = Object.keys(params)
            // let paramsValue =
            if(params["button"] === 'on'){
                params["button"] = ''
            }
            if(params["temperature"] === 'plus'){
                this.airTemp++
                params["temperature"] = this.airTemp
            } else if(params["temperature"] === 'minus'){
                this.airTemp--
                params["temperature"] = this.airTemp
            }
            let paramsValue = `${paramsKey}=` +  params[paramsKey]
            let sendUrl = this.$store.state.baseUrl + "1/appliances/" + id + "/aircon_settings"
            console.log("send signal", sendUrl)
            console.log("send params", paramsValue, paramsKey,params[paramsKey])
            const response = await fetch(sendUrl, {
                method: "POST",
                body: paramsValue,
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer " + this.$store.state.token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.progress = false
                console.log("data:",data)
                this.airTemp = data["temp"]
                this.$store.state.airTemp = this.airTemp
            })
            console.log("response:",response)
        }
    },
}
</script>

<style>

</style>