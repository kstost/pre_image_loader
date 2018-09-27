# pre_image_loader
웹에서 이미지 리소스를 불러오고 직렬/병렬의 다운로드 방식을 지원합니다

사용법
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
