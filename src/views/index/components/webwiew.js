import { loanRecord } from '@api/api_loan';
var productId = "";
var isLoad = false;
var is = false;//
function downloadFile(url1){
    // 下载路径
    
    let fileTransfer = new FileTransfer(),
    uri = encodeURI(url1), 
    fileUrl = cordova.file.externalDataDirectory + uri.substr(uri.lastIndexOf("/") + 1);
    var pDialog = window.navigator.dialogsPlus.progressStart("下载中");
    fileTransfer.download(uri, fileUrl, entry => {
        pDialog.hide();
        cordova.plugins.fileOpener2.open(entry.toURL(), 'application/vnd.android.package-archive',{
            error : function(e){
                is = false;
            }, 
            success : function(){
                is = false;
            } 
        });
        console.log("download accessory successful. accessory information : " + JSON.stringify(entry));
    }, error => {
        is = false;
        pDialog.hide();
        console.error("download accessory fail. Because of : " + JSON.stringify(error));
    });
    fileTransfer.onprogress = function (e) {
                
        if (e.loaded >= e.total) {
            is = false;
        }
        pDialog.setValue(e.loaded / e.total * 100);
    }

    isLoad = true;
    submitRecord(productId,1);
}
function submitRecord(id,type){
    
    loanRecord({
        productId: productId,
        type: type
    }).then(res=>{
        
    });
}
function webwiew(url,name,id){
    productId = id;
    isLoad = false;
    var browser = cordova.ThemeableBrowser.open(url, '_bank', {
        title: {
            color: '#FFFFFF',
            staticText: name,
            showPageTitle: true
        },
        toolbar: {
            height: 44,
            color: '#387EF5FF'
        },
        statusbar: {
            color: '#387EF5FF'
        },
        closeButton: {
            image: 'close',
            imagePressed: 'close_pressed',
            align: 'left',
            event: 'closePressed'
        },
        backButtonCanClose: true
    }).addEventListener('loadurl', function (e) {
        var url1 = e.url;
        if(url1.indexOf(".apk")>=0 && !is){
            is = true;
            // browser.close();
            // var b = cordova.ThemeableBrowser.open(url1,'_system');

            var permissions = cordova.plugins.permissions;

            permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);
            function checkPermissionCallback(status){
                if (!status.hasPermission) {
                    var errorCallback = function() {
                        is = false;
                        downloadFile(url1);
                    }

                    permissions.requestPermission(
                        permissions.READ_EXTERNAL_STORAGE,
                        function(status) {
                            if (status.hasPermission) {
                                errorCallback();
                                
                            } else {
                                downloadFile(url1);
                            }
                        },
                        errorCallback);
                }else{
                    downloadFile(url1);
                }
            }
            
           

        }
    }).addEventListener('sharePressed', function(e) {
        browser.close();
        if(!isLoad){
            submitRecord(productId,2)
        }
    });  
}



export default webwiew;