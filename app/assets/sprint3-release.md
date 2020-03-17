
## Widget List

### 1. Patient Search Bar [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-bar?max=10&offset=0&page=0&filter[gender]=all)

- สามารถค้นหาข้อมูล Patient ได้จาก give_name , last_name , identification (Passport , MRN, HN), gender

- การกรองข้อมูลจะเริ่มต้นเมื่อกดปุ่ม SEARCH

- สามารถ RESET ค่าการกรองทั้งหมด

### 2. Patient Search Result [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-result?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

- แสดงข้อมูลของ Patient โดยแสดงผลเป็นตาราง

- ข้อมูล Patient ที่แสดงผลจะถูกกรองจาก query param

- ตารางรองรับการทำ Lazy loading และสามารถกำหนดข้อมูลสูงสุดที่ต้องการแสดงผลได้

- ตารางสามารถ Sort โดย given_name, gender, DOB, ID, MRN

- สามารถกดที่ Patient เพื่อไปยัง Patient Summary

### 3. Patient Search [link](https://hms-widget.bonmek.com/embedded-widget/patient-search?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

- สามารถค้นหาข้อมูล Patient ได้จาก give_name , last_name , identification (Passport , MRN, HN), gender

- การกรองข้อมูลจะเริ่มต้นเมื่อกดปุ่ม SEARCH

- สามารถ RESET ค่าการกรองทั้งหมด

- ข้อมูลการค้นหาทั้งหมดจะถูก push ใน history ของ browser

- แสดงข้อมูลของ Patient โดยแสดงผลเป็นตาราง

- ข้อมูล Patient ที่แสดงผลจะถูกกรองจาก query param

- ตารางรองรับการทำ lazy loading และสามารถกำหนดข้อมูลสูงสุดที่ต้องการแสดงผลได้

- ตารางสามารถ sort โดย given_name, gender, DOB, ID, MRN

- สามารถกดที่ Patient เพื่อไปยัง Patient summary

### 4. Patient Demographic [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5)

- แสดงข้อมูลทั่วไปของ Patient โดยรับ ID ของ Patient

- ข้อมูลที่แสดงคือ given_name, last_name, picture, age, gender, DOB, phone, address, email, language

### 5. Patient Encounter Timeline [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/encounter-timeline?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20&isRouteable=true)

- แสดงข้อมูล Encounter ของ Patient โดยรับ ID ของ Patient

- ข้อมูลแสดงในรูปแบบ Timeline โดยแสดงเวลาด้านซ้ายและข้อมูล Encounter ด้านขวา

- สามารถกดเพื่อแสดงข้อมูลเพิ่มเติมของ Encounter โดยมีข้อมูล ประเภทการรักษา, ผลการวินิจฉัย, Class Code, Practitioner

### 6. Patient Practitioner Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-practitioner-card?encounterId=3898f0f9-385e-478d-be25-5f05719e80af&maxDisplay=2)

- แสดงข้อมูลผู้มีส่วนร่วมใน Encounter โดยรับ ID ของ Encounter ที่สนใจ

- สามารถกำหนดจำนวนผู้มีส่วนร่วมสูงสุดที่ต้องการแสดงได้ หากผู้มีส่วนร่วมเกินค่าสูงสุด จะแสดงชื่อเป็น ... และแสดงจำนวนผู้มีส่วนร่วมที่ไม่ได้แสดงชื่อ

### 7. Patient Allergy List Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-allergy-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)
- แสดงข้อมูลอาการแพ้ทั้งหมดของ Patient โดยรับ ID ของ Patient

- สีของวงกลมด้านซ้ายแสดงถึงความร้ายแรงของอาการแพ้ โดย สีส้ม แสดง ความร้ายแรงต่ำ, สีแดง แสดงความร้ายแรงสูง, สีเทา แสดง unable-to-assess
- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll

### 8. Patient Medication Request List Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-medication-request-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูลยาทั้งหมดของ Patient โดยรับ ID ของ Patient

### 9. Patient Immunization Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/immunization-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูลรายการการได้รับภูมิคุ้มกันของ Patient โดยรับ ID ของ Patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll

- สามารถกรองข้อมูลโดยกรองจาก vaccine code, status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

- สามารถกรุ้ปข้อมูลภูมิคุ้มกันที่ได้รับโดย type

### 10. Patient Condition Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/condition-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูล Condition ของ Patient โดยรับ ID ของ Patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll

- สามารถกรองข้อมูลโดยกรองจาก name, clinical status, verification status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

### 11. Patient Procedure Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/procedure-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20)

- แสดงข้อมูล Procedure ของ Patient โดยรับ ID ของ Patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll

- สามารถกรองข้อมูลโดยกรองจาก code

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

### 12. Patient Care Plan Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/care-plan-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- แสดงข้อมูล Care Plan ของ Patient โดยรับ ID ของ Patient

- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll

- สามารถกรองข้อมูลโดยกรองจาก status

- เมื่อมีการกรองข้อมูลจะแสดงตัวเลขเพื่อบอกว่ามีการกรองอยู่ทั้งหมดกี่ field

- สามารถกรุ้ปข้อมูลภูมิคุ้มกัน Care Plan ที่ได้รับโดย category

### 13. Patient Summary Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/summary-cards?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดง Observation จำพวก Vital-Sign ของ Patient ประกอบไปด้วย Blood Pressure, Body Measurement, Body Temperature, Heart Rate, Tabaco Smoking Status

### 14. Observation Blood Pressure Card [link](http://localhost:3000/embedded-widget/observation/blood-pressure-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- แสดงข้อมูลความดันเลือดของ Patient ใน Encounter ที่เลือก โดยรับ ID ของ Patient และ encounter

### 15. Observation Temperature Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/temperature-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลอุณหภูมิของ Patient ใน Encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 16. Observation Body Measurement Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-measurement-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลสัดส่วนร่างกายของ Patient ใน Encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter
- ข้อมูลประกอบไปด้วย Height, Weight, Body mass index

### 17. Observation Heart Rate Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลอัตราการเต้นของหัวใจของ Patient ใน Encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 18. Observation Tabaco Smoking Status Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/tabaco-smoking-status-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดงข้อมูลสถานการสูบบุหรี่ของ Patient ใน Encounter ที่เลือก โดยรับ ID ของ Patient และ Encounter

### 19. Observation Blood Pressure Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/blood-pressure-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลความดันเลือดของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient

### 20. Observation Body Height Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-height-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลส่วนสูงของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient

### 21. Observation Body Weight Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-weight-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลส่วนน้ำหนักของ Patient ในรูปแบบของ Line Area Graph ที่เลือก โดยรับ ID ของ Patient

### 22. Observation Body Mass Index Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-mass-index-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลส่วน bmi ของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient

### 23. Observation Body Temperature Graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/body-temperature-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลส่วนอุณหภูมิของร่างกายของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient

### 24. Observation Heart Rate Graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูลส่วนอัตราการเต้นของหัวใจของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient

### 25. Observation Summary Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/summary-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5)
- แสดงข้อมูลโดยรวมของ Patient ในรูปแบบของ Line Area Graph โดยรับ ID ของ Patient
- สามารถเลือกได้ว่าจะแสดงกราฟข้อมูลใดของ Patient

### 26. Observation Laboratory Table [link](https://hms-widget.bonmek.com/embedded-widget/observation/laboratory-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)
- แสดงข้อมูล Care Plan ของ Patient โดยรับ ID ของ Patient
- ข้อมูลที่แสดงผลจะแสดงในรูปแบบตารางซึ่งรองรับการทำ Infinite scroll
- ข้อมูลจะแบ่งสีแดงเพื่อแสดงถึงข้อมูลที่มีค่าต่ำกว่ามาตรฐาน และสีเขียวหามีค่าตรงตามมาตรฐาน

### 27. Observation History Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/history-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&selectedCard=bloodPressure)
- แสดงกราฟของ Observation จำพวก Vital-Sign ของ Patient โดยต้องส่งข้อมูลว่าต้องการให้ Widget แสดงกราฟอะไร ซึ่งประกอบไปด้วย Blood Pressure, Body Height, Body Weight, Body Mass Index, Body Temperature, Heart Rate

### 28. Patient Summary [link](https://hms-widget.bonmek.com/embedded-widget/patient-summary?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)
- แสดง Demographic ของ Patient ซึ่งรวมไปถึงข้อมูลต่างๆที่เกี่ยวข้องกับ Patient ประกอบไปด้วย Allergies, Medication request, Immunization, Condition, Procedure, Care Plan, Encounter และกราฟข้อมูลต่างๆ ที่เกี่ยวข้องกับบคนไข้ ประกอบไปด้วย Body Height , Body Weight, Body Mass Index, Blood Pressure, Body Temperature, Heart Rate 
- แสดงข้อมูลที่เกี่ยวข้องกับ Encounter และ Patient ประกอบไปด้วย Practitioner, Body Height, Body Weight, Body Mass Index, Blood Pressure, Body Temperature, Heart Rate, Tablaco Smoking Status
- Card ที่แสดงข้อมูลต่างๆ สามารถปรับตำแหน่งได้
- สามารถลบ Card ที่ไม่ต้องการแสดงผล
- สามารถเพิ่ม Card เพื่อแสดงผลเพิ่มเติม
- Card สามารถปรับขนาดตามที่ต้องการ
- ตำแหน่งและขนาดของ Card จะมีการจำ State ไว้จนกว่าหน้าเว็บเพจจะถูกปิด
- สามารถคืนค่าตำแหน่งและขนาดของ Card ให้เป็นค่าเริ่มต้นได้
- สามารถแสดงประวัติของ Observation จำพวก Vital-Sign ของ Patient โดยการคลิกที่หัวข้อของ Card ที่ต้องการแสดงกราฟ เช่น คลิก Height ใน Body Measurement Card เพื่อแสดงกราฟความสูงของ Patient

### 29. Embedded Widget [link](https://hms-widget.bonmek.com/embedded-widget)
- แสดง Document และ Playground ให้กับ Embedded Widget ที่สามารถใช้งานได้
- ในส่วนของ Playground มี Form สำหรับระบุ Parameter ต่างๆที่ Embedded widget ต้องการใช้งาน และแสดง Event Response ที่ Embedded Widget สร้าง Event ขึ้น
- ในส่วนของ Document จะแสดงถึงการติดตั้ง, Parameter ต่างๆที่สามารถใช้งานได้, Event ต่างๆ ที่ Embedded Widget มีการสร้างและเรียกใช้งาน 