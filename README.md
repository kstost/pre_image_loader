# pre_image_loader
웹에서 이미지 리소스를 불러오고 직렬/병렬의 다운로드 방식을 지원합니다

######사용법
아래 코드와 같이 사용하면 됩니다.
progress 는 이미지가 건건이 처리될때마다 호출되며, 여기서 진행상황에 대한 처리를 할 수 있습니다
complete 는 모든 처리가 완료될 때 마지막에 1회 호출됩니다
resources 는 다운로드 받을 이미지의 목록입니다
target 은 resources 에서 다운받을 것들에 대한 목록입니다. 아래 코드에서 resources 에 pc, mobile 두개의 리스트가 있는 상황에서 target 을 ['pc'] 로만 주면 mobile 은 제외하고 pc 목록에 대해서만 다운로드 받습니다
serialization 은 true 로 주게되면 이미지를 순차적으로 받습니다. false 로 하면 동시 다발적으로 받습니다.

```javascript
pre_image_loader({
   progress: function (result) {
      console.log('이미지 건건이 처리 다운로드완료나 실패될 때마다 호출 됨');
      console.log('다운로드 ' + (result.success ? '성공' : '실패'));
      console.log('남은갯수 ' + result.count.total + '개 중 ' + result.count.left + '개 남음');
      console.log('처리주소 ' + result.img.src);
   },
   complete: function (result) {
      console.log('모든 다운로드 완료');
      console.log('소요시간:' + result.time);
      console.log('성공항목');
      result.success.forEach(img => {
         console.log(img);
      });
      console.log('실패항목');
      result.fail.forEach(img => {
         console.log(img);
      });
   },
   resources: {
      pc: [
         'http://127.0.0.1/face1.jpg',
         'http://127.0.0.1/face2.jpg',
         'http://127.0.0.1/face3.jpg'
      ],
      mobile: [
         'http://127.0.0.1/mobile_face1.jpg',
         'http://127.0.0.1/mobile_face2.jpg',
         'http://127.0.0.1/mobile_face3.jpg'
      ]
   },
   target: ['mobile', 'pc'],
   serialization: false
});
```
