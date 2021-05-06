const Server = {

    //domain:"http://89.32.251.101:4054",
    //domain:"http://192.168.1.33:4054",
    domain:"http://171.22.27.172:4054",

    urls:{
        
        REGISTER:`/app/register`,
        CONFIRM:`/app/confirm`,
        CHECK_TOKEN:`/app/checktoken`,
        CHANGE_REGISTER_PHONE:`/app/changeregisterphone`,
        SEND_VERIFICATION:`/app/sendverification`,
        SET_NAME:`/app/setname`,
        EDIT_PROFILE:`/app/editprofile`,
        CHANGE_PROFILE_PIC:`/app/changeprofilepic`,
        SET_PIC:`/app/setpic`,
        CHECK_IN:`/app/checkin`,
        MAP_STATIONS:`/app/mapstations`,
        VIEW_PROFILE:`/app/viewprofile`,
        WEEKLY_CHECK_IN:`/app/weeklycheckin`,
        WEEKLY_CHALLENGE:`/app/weeklychallenge`,

        ////////////////////////////////////////////////////

        GET_PROFILE_PIC:`/web/pic/profile`,
        GET_USER_PIC:`/web/pic/user`,
        GET_SATION_PIC:`/web/pic/station`,
        GET_TOP_USERS:`/web/topusers`,
        GET_STATIONS:`/web/stations`,
        GET_STATION:`/web/station`,

        ////////////////////////////////////////////////////

        ADMIN_LOG_IN:`/admin/login`,
        ADMIN_ALL_SATIONS:`/admin/allstations`,
        ADMIN_ALL_USERS:`/admin/allusers`,
        ADMIN_INFO_USER:`/admin/userinfo`,
        ADMIN_INFO_STATION:`/admin/stationinfo`,
        ADMIN_ADD_STATION:`/admin/addstation`,
        ADMIN_EDIT_STATION:`/admin/editstation`,
        ADMIN_DELETE_STATION:`/admin/deletestation`,
        ADMIN_EDIT_WEEKLY:`/admin/editweekly`,
        ADMIN_WEEKLY_INFO:`/admin/weeklyinfo`,
    },

    result_codes:{

        SUCCESS:"1000",
        SERVER_ERROR:"1001",
        PHONE_NUMBER_EXISTS:"1002",
        INVALID_PHONE_NUMBER:"1003",
        INVALID_VERIFICATION_CODE:"1004",
        VERIFICATION_CODE_EXPIRED:"1005",
        INVALID_TOKEN:"1006",
        INVALID_NAME:"1007",
        FILE_NOT_FOUND:"1008",
        INVALID_BIO:"1009",
        INVALID_PAGE:"10010",
        INVALID_CHUNK:"10011",
        INVALID_SEARCH:"10012",
        CHECK_IN_FAILED:"10013",
        INVALID_COORDINATE:"10014",
        STATION_NOT_FOUND:"10015",
        NO_WEEKLY_AVALIBLE:"10016",
        ALLREADY_CHECKED_IN:"10017",
    },

    result_code2Message: (result_code)=>{

        Object.keys(Server.result_codes).forEach(k=>{
            if(Server.result_codes[k] == result_code){
                alert(k)
            }
        });
    },

    getReq: async (url)=>{

        let res =  await fetch(Server.domain+url);

        return await res.json();
    },

    postReq: async (url, json)=>{

        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(json),
        });

        return await res.json();
    },

    formData: async (url, data)=>{

        let res =  await fetch(url, {
            method: 'POST',
            body:data
        });

        return await res.json();
    }
}

export default Server;