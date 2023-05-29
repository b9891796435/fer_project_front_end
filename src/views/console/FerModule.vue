<template>
    <div class="container">
        <div class="left">
            <video id="video" autoplay></video>
        </div>
        <div class="right">
            <div ref="pieChartElement" style="width: 250px;height: 400px;"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as echarts from 'echarts';
import apis, { EMOTIONS } from '@/tools/apis';
const pieChartElement = ref<HTMLDivElement | null>(null);
const pieChartControler = ref<echarts.ECharts | null>(null);

// peer connection
let pc: RTCPeerConnection;

// data channel
let dc: RTCDataChannel;
let dcInterval: number;

let pred = ref<number[]>([])

onMounted(() => {
    if (pieChartElement.value) {
        pieChartControler.value = echarts.init(pieChartElement.value);
        pieChartControler.value.setOption({
            tooltip: {
                trigger: 'item'
            },
        });
    }
})
watch(pred, (newValue) => {
    let pieData: { value: number, name: string }[] = []
    for (let i in newValue) {
        pieData.push({
            value: newValue[i],
            name: EMOTIONS[i]
        })
    }
    (pieChartControler.value as any).setOption({
        series: [
            {
                name: '表情成分',
                type: 'pie',
                data: pieData
            }
        ],
    });

})
function createPeerConnection() {
    var config: RTCConfiguration = {
        iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
    };
    pc = new RTCPeerConnection();
    // connect audio / video
    pc.addEventListener('track', function (evt) {
        let ele = document.getElementById('video')
        if (ele) {
            (ele as HTMLVideoElement).srcObject = evt.streams[0];
        }
    });

    return pc;
}

function negotiate() {
    return pc.createOffer().then(function (offer) {
        return pc.setLocalDescription(offer);
    }).then(function () {
        // wait for ICE gathering to complete
        return new Promise<void>(function (resolve) {
            if (pc.iceGatheringState === 'complete') {
                resolve();
            } else {
                function checkState() {
                    if (pc.iceGatheringState === 'complete') {
                        pc.removeEventListener('icegatheringstatechange', checkState);
                        resolve();
                    }
                }
                pc.addEventListener('icegatheringstatechange', checkState);
            }
        });
    }).then(function () {
        let offer = pc.localDescription;
        if (offer)
            return apis.offer({
                sdp: offer.sdp,
                type: offer.type,
                token: localStorage.getItem('auth') as string
            })
        else {
            throw Error('asdf')
        }
    }).then(function (answer) {
        return pc.setRemoteDescription(answer);
    }).catch(function (e) {
        alert(e);
    });
}

function start() {
    pc = createPeerConnection();
    dc = pc.createDataChannel('chat', { "ordered": false, "maxRetransmits": 0 });
    dc.onmessage = function (evt) {
        pred.value = JSON.parse(evt.data).data
    };
    dc.onclose = function () {
        clearInterval(dcInterval);
    };
    dc.onopen = function () {
        dcInterval = setInterval(function () {
            var message = 'ping';
            dc.send(message);
        }, 1000);
    };

    var constraints = {
        audio: false,
        video: {
            width: 300,
            height: 300,
            frameRate: {
                max: 2
            }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        stream.getTracks().forEach(function (track) {
            pc.addTrack(track, stream);
        });
        return negotiate();
    }, function (err) {
        alert('Could not acquire media: ' + err);
    });

}

function stop() {
    // close data channel
    if (dc) {
        dc.close();
    }

    // close transceivers
    if (pc.getTransceivers) {
        pc.getTransceivers().forEach(function (transceiver) {
            if (transceiver.stop) {
                transceiver.stop();
            }
        });
    }

    // close local audio / video
    pc.getSenders().forEach(function (sender) {
        if (sender.track)
            sender.track.stop();
    });

    // close peer connection
    setTimeout(function () {
        pc.close();
    }, 500);
}
onMounted(start)
onBeforeUnmount(stop)


</script>
<style scoped lang="less">
.container {
    display: flex;
    flex-direction: row;
    margin: 28px;

    .left {
        width: 350px;
        height: 350px;
        border: solid rgb(var(--green-7)) 1px;
        border-radius: 28px;
        display: flex;
    }

    .right {
        margin-left: 72px;
    }
}

video {
    width: 300px;
    height: 300px;
    margin: auto;
}
</style>