
## Widget List

### 1. patient search bar [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-bar?max=10&offset=0&page=0&filter[gender]=all)

- สามารถค้นหาข้อมูล Patient ได้จาก give_name , last_name , identification (Passport , MRN, HN), gender

- การกรองข้อมูลจะเริ่มต้นเมื่อกดปุ่ม SEARCH

- สามารถ RESET ค่าการกร้องทั้งหมด

### 2. patient search result [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-result?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

- แสดงข้อมูลของ Patient โดยแสดงผลเป็นตาราง

- ข้อมูล Patient ที่แสดงผลจะถูกกรองจาก query param

- ตารางรองรับการทำ Lazy loading และสามารถกำหนดข้อมูลสูงสุดที่ต้องการแสดงผลได้

- ตารางสามารถ Sort โดย given_name, gender, DOB, ID, MRN

- สามารถกดที่ Patient เพื่อไปยัง patient summary

### 3. patient search [link](https://hms-widget.bonmek.com/embedded-widget/patient-search?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

- สามารถค้นหาข้อมูล Patient ได้จาก give_name , last_name , identification (Passport , MRN, HN), gender

- การกรองข้อมูลจะเริ่มต้นเมื่อกดปุ่ม SEARCH

- สามารถ RESET ค่าการกร้องทั้งหมด

- ข้อมูลการค้นหาทั้งหมดจะถูก push ใน history ของ browser

- แสดงข้อมูลของ Patient โดยแสดงผลเป็นตาราง

- ข้อมูล Patient ที่แสดงผลจะถูกกรองจาก query param

- ตารางรองรับการทำ lazy loading และสามารถกำหนดข้อมูลสูงสุดที่ต้องการแสดงผลได้

- ตารางสามารถ sort โดย given_name, gender, DOB, ID, MRN

- สามารถกดที่ Patient เพื่อไปยัง patient summary

### 4. patient demographic [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5)

- แสดงข้อมูลทั่วไปของ Patient โดยรับ ID ของ patient

- ข้อมูลที่แสดงคือ given_name, last_name, picture, age, gender, DOB, phone, address, email, language

### 5. patient encounter timeline [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/encounter-timeline?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20&isRouteable=true)

- แสดงข้อมูล encounter ของ Patient โดยรับ ID ของ patient

- ข้อมูลแสดงในรูปแบบ timeline โดยแสดงเวลาด้านซ้ายและข้อมูล encounter ด้านขวา

- สามารถกดเพื่อแสดงข้อมูลเพิ่มเติมของ encounter โดยมีข้อมูล ประเภทการรักษา, ผลการวินิจฉัย, Class Code, Practitioner

### 6. patient practitioner card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-practitioner-card?encounterId=3898f0f9-385e-478d-be25-5f05719e80af&maxDisplay=2)

- แสดงข้อมูลผู้มีส่วนร่วมใน encounter โดยรับ ID ของ encounter ที่สนใจ

- สามารถกำหนดจำนวนผู้มีส่วนร่วมสูงสุดที่ต้องการแสดงได้ หากผู้มีส่วนร่วมเกินค่าสูงสุด จะแสดงชื่อเป็น ... และแสดงจำนวนผู้มีส่วนร่วมที่ไม่ได้แสดงชื่อ

### 7. patient allergy list card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-allergy-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)
- แสดงข้อมูลอาการแพ้ทั้งหมดของ Patient โดยรับ ID ของ patient

- สีของวงกลมด้านซ้ายแสดงถึงความร้ายแรงของอาการแพ้ โดย สีส้ม แสดง ความร้ายแรงต่ำ, สีแดง แสดงความร้ายแรงสูง, สีเทา แสดง unable-to-assess

### 8. patient medication request list card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-medication-request-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูลยาทั้งหมดของ Patient โดยรับ ID ของ patient

### 9. patient immunization table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/immunization-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูลรายการการได้รับภูมิคุ้มกันของ Patient โดยรับ ID ของ patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinit scroll

- สามารถกรองข้อมูลโดยกรองจาก vaccine code, status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

- สามารถกรุ้ปข้อมูลภูมิคุ้มกันที่ได้รับโดย type

### 10. patient condition table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/condition-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูล Condition ของ Patient โดยรับ ID ของ patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinit scroll

- สามารถกรองข้อมูลโดยกรองจาก name, clinical status, verification status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

### 11. patient procedure table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/procedure-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20)

- แสดงข้อมูล Procedure ของ Patient โดยรับ ID ของ patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinit scroll

- สามารถกรองข้อมูลโดยกรองจาก code

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

### 12. patient care plan table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/care-plan-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูล Care Plan ของ Patient โดยรับ ID ของ patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinit scroll

- สามารถกรองข้อมูลโดยกรองจาก status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

- สามารถกรุ้ปข้อมูลภูมิคุ้มกัน Care Plan ที่ได้รับโดย category

### 13. patient summary card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/summary-cards?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดง Observaion - vital-sign ของ Patient ประกอบไปด้วย Blood Pressure, Body Measurement, Body Temperature, Heart Rate, Tabaco Smoking Status

### 14. observation blood pressure card [link](http://localhost:3000/embedded-widget/observation/blood-pressure-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- แสดงข้อมูลความดันเลือดของ Patient ใน encounter ที่เลือก โดยรับ ID ของ patient และ encounter

### 15. observation temperature card [link](https://hms-widget.bonmek.com/embedded-widget/observation/temperature-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลอุณหภูมิของ Patient ใน encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 16. observation body measurement card [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-measurement-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลสัดส่วนร่างกายของ Patient ใน encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter
- ข้อมูลประกอบไปด้วย Height, Weight, Body mass index

### 17. observation heart rate card [link](https://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลอัตราการเต้นของหัวใจของ Patient ใน encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 18. observation tabaco smoking status card [link](https://hms-widget.bonmek.com/embedded-widget/observation/tabaco-smoking-status-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลสถานการสสูบบุหรี่ของ Patient ใน encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 19. observation blood pressure graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/blood-pressure-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลความดันเลือดของ Patient โดยรับ ID ของ Patient

### 20. observation body height graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-height-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลส่วนสูงของ Patient โดยรับ ID ของ Patient

### 21. observation body weight graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-weight-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลส่วนน้ำหนักของ Patient ที่เลือก โดยรับ ID ของ Patient

### 22. observation body mass index graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-mass-index-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลส่วน bmi ของ Patient โดยรับ ID ของ Patient

### 23. observation body temperature graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/body-temperature-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลส่วนอุณหภูมิของร่างกายของ Patient โดยรับ ID ของ Patient

### 24. observation heart rate graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงกราฟข้อมูลส่วนอัตราการเต้นของหัวใจของ Patient โดยรับ ID ของ Patient

### 25. observation summary graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/summary-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5)
- แสดงกราฟข้อมูลโดยรวมของ Patient โดยรับ ID ของ Patient
- สามารถเลือกได้ว่าจะแสดงกราฟข้อมูลใดของ Patient

### 26. observation laboratory table [link](https://hms-widget.bonmek.com/embedded-widget/observation/laboratory-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูล Care Plan ของ Patient โดยรับ ID ของ patient
- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinit scroll
- ข้อมูลจะแบ่งสีแดงเพื่อแสดงถึงข้อมูลที่มีค่าต่ำกว่ามาตรฐาน และสีเขียวหามีค่าตรงตามมาตรฐาน

### 27. observation history graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/history-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&selectedCard=bloodPressure)
- แสดงกราฟของ Observaion vital-sign ของ Patient โดยต้องส่งข้อมูลว่าต้องการให้ Widget แสดงกราฟอะไร ซึ่งประกอบไปด้วย Blood Pressure, Body Height, Body Weight, Body Mass Index, Body Temperature, Heart Rate

### 28. patient summary [link](https://hms-widget.bonmek.com/embedded-widget/patient-summary?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดง Demographic ของ Patient ซึ่งรวมไปถึงข้อมูลต่างๆที่เกี่ยวข้องกับ Patient ประกอบไปด้วย Allergies, Medication request, Immunization, Condition, Procedure, Care Plan, Encounter และกราฟข้อมูลต่างๆ ที่เกี่ยวข้องกับบคนไข้ ประกอบไปด้วย Body Height , Body Weight, Body Mass Index, Blood Pressure, Body Temperature, Heart Rate 
- แสดงข้อมูลที่เกี่ยวข้องกับ Encounter และ Patient ประกอบไปด้วย Practitioner, Body Height, Body Weight, Body Mass Index, Blood Pressure, Body Temperature, Heart Rate, Tablaco Smoking Status
- Card ที่แสดงข้อมูลต่างๆ สามารถปรับตำแหน่งได้
- สามารถลบ Card ที่ไม่ต้องการแสดงผล
- สามารถเพิ่ม Card เพื่อแสดงผลเพิ่มเติม
- Card สามารถปรับขนาดตามที่ต้องการ
- ตำแหน่งและขนาดของ Card จะมีการจำ State ไว้จนกว่าหน้าเว็บเพจจะถูกปิด
- สามารถคืนค่าตำแหน่งและขนาดของ Card ให้เป็นค่าเริ่มต้นได้
- สามารถแสดงประวัติของ Observation - vital-sign ของ Patient โดยการคลิกที่หัวข้อของ Card ที่ต้องการแสดงกราฟ เช่น คลิก Height ใน Body Measurement Card เพื่อแสดงกราฟความสูงของ Patient

### 29. embedded widget [link](https://hms-widget.bonmek.com/embedded-widget)
- แสดง Document และ Playground ให้กับ Embedded Widget ที่สามารถใช้งานได้
- ในส่วนของ Playground มี Form สำหรับระบุ Parameter ต่างๆที่ Embedded widget ต้องการใช้งาน และแสดง Event Response ที่ Embedded Widget สร้าง Event ขึ้น
- ในส่วนของ Document จะแสดงถึงการติดตั้ง, Parameter ต่างๆที่สามารถใช้งานได้, Event ต่างๆ ที่ Embedded Widget มีการสร้างและเรียกใช้งาน 