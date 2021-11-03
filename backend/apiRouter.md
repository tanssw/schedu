# All API in schedu app
*Server.js listening on port 3000*

## Student table
**Get all student in Student Table**
- localhost:3000/student/all/


**Get student by *student_id* in Student Table**
- localhost:3000/student/*student_id*
---
## Teacher table
**Get all teacher in Teacher Table**
- localhost:3000/teacher/all    


**Get teacher by *teacher_id* in Teacher Table**
- localhost:3000/teacher/*teacher_id*
---
## Subject table
**Get all subject in Subject Table**
- localhost:3000/subject/all  


**Get subject by *subject_id* in Subject Table**
- localhost:3000/subject/*subject_id*
---

## Subject_teacher table
**Get all teacher teach in Subject_teacher Table**
- localhost:3000/teach/all 


**Get teach by *subject_id* or *teacher_id* in Subject_Teacher Table**
- localhost:3000/subject/*subject_id* or *teacher_id*
---
## Registrar table
**Get all registrar in mySQL database**
- localhost:3000/registrar/all 

**Get registrar by *student_id* in registrar Table**
- localhost:3000/subject/*subject_id* or *teacher_id*
---
## Event
**Get all event in mongoDB**
- localhost:3000/event/all

**Get event by *Object_id* in mongoDB**
- localhost:3000/event/*Object_id*

**Create event to mongoDB***
- localhost:3000/event/addEvent

**require object json payload*


**Update event by *Object_id* in mongoDB***
- localhost:3000/event/updateEvent/*Object_id*

**require object json payload*

**Delete event by *Object_id* in mongoDB**
- localhost:3000/event/delEvent/*Object_id*




