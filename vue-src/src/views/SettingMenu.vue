<template>
    <div>
<!-- メニュータイトル -->
        <v-row>
            <v-col cols="12" class="pa-4">
                <div class="text-h5">
                    Setting Menu
                </div>
            </v-col>
        </v-row>
        <v-divider color="success"></v-divider>
<!-- end メニュータイトル -->

<!-- Token セット -->

        <v-col cols="8" class="pt-4">
            <div class="text-subtitle-1 text-decoration-underline font-weight-medium" >
                Token
            </div>
        </v-col>
        <v-col class="py-0">
            <v-text-field
                v-model="token"
                label="Set Your Natuer Remo Token"
                :type="tokenShow ? 'text' : 'password'"
                :append-icon="tokenShow ? 'mdi-eye' : 'mdi-eye-off'"
                :append-outer-icon="tokenSet? 'mdi-toggle-switch':'mdi-toggle-switch-off-outline'"
                @click:append="tokenShow = !tokenShow"
                @click:append-outer="setToken()"
            ></v-text-field>
            <div v-show="!tokenSet" class="text-caption text--disabled ">
                tokenをsetするとapiが実行されます
            </div>
        </v-col>
        <v-col v-show="tokenSet" class="py-0">
            <v-switch v-model="tokenStorageSetSwitch"  label="TokenをBrowserのLocalStorageに保存"></v-switch>
        </v-col>
<!-- end Token セット -->
<!-- device エリア -->
        <v-col cols="12" class="pt-2">
            <div class="text-subtitle-1 text-decoration-underline font-weight-medium" >
                Device
            </div>
            <v-simple-table dense>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>SERIAL_NUMBER</th>
                        <th>FIRMWARE_VERSION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{{ device["id"]}}</th>
                        <th>{{ device["name"]}}</th>
                        <th>{{ device["serial_number"]}}</th>
                        <th>{{ device["firmware_version"]}}</th>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
<!-- end device エリア -->

<!-- appliances エリア -->
        <v-col cols="12">
            <div class="text-subtitle-1 text-decoration-underline font-weight-medium">
                APLIANCES
            </div>
            <v-simple-table dense>
                <thead>
                    <tr>
                        <th>APLIANCE_ID</th>
                        <th>TYPE</th>
                        <th>NICKNAME</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="appliance in appliancesList" :key="appliance.id">
                        <th>{{ appliance.id }}</th>
                        <th>{{ appliance.type }}</th>
                        <th>{{ appliance.nickname }}</th>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
<!-- end appliances エリア -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            tokenStorageSetSwitch: false,
            token: "",
            tokenShow: false,
            tokenSet: false,
            appliancesList: [],
            device:""
        }
    },
    created(){
        if(this.$store.state.token.length > 0){
            this.token = this.$store.state.token
            this.tokenSet = true
            this.appliancesList = this.$store.state.appliancesList["payload"]
            this.device = this.$store.state.device["payload"]
            this.tokenStorageSetSwitch = this.$store.state.tokenStorageSetSwitch
            console.log("[SettingMenu][created]this.token:",this.token)
        }
        else if(localStorage.getItem("token")) {
            this.tokenStorageSetSwitch = true
            this.token = localStorage.getItem("token");
            this.setToken()
        }
        else {
            console.log("please set your token")
        }
    },
    methods: {
        ...mapActions(['setTokenAction','setAppliancesAction','setDeviceAction']),
        setToken(){
            if(!this.tokenSet){
                this.tokenSet = !this.tokenSet
                this.setTokenAction({
                    token: this.token
                })
                this.getAppliances()
            } else {
                // unset token
                this.token = ""
                this.tokenSet = !this.tokenSet
                this.setTokenAction({
                    token: ""
                })
                this.appliancesList = [];
                this.setAppliancesAction({
                    payload: []
                })
            }
        },
        async getAppliances() {
            let getUrl = this.$store.state.baseUrl + "1/appliances";
            console.log("[store][mutations]getAppliancesAction", getUrl);
            const response = await fetch(getUrl, {
                method: "GET",
                headers: {
                accept: "application/json",
                Authorization: "Bearer " + this.token,
                },
            })
            .then((response) => response.json())
            .then((data) => {
          this.appliancesList = data;
          this.setDevice()
          this.setAppliancesAction({
              payload: data
          })
          console.log("data => this.appliancesList", this.appliancesList);
          console.log("response", response);
        });
        },
        setDevice(){
            this.device = this.appliancesList[0]["device"];
            this.setDeviceAction({
                payload: this.device
            })
        }
    },
    watch: {
        tokenStorageSetSwitch(){
            if(this.tokenStorageSetSwitch){
                localStorage.setItem("token", this.token);
            } else {
                localStorage.removeItem("token");
            }
            this.$store.state.tokenStorageSetSwitch = this.tokenStorageSetSwitch
            console.log(this.tokenStorageSetSwitch)
        }
    }
}
</script>

<style>

</style>