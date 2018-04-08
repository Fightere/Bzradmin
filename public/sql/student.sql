#数据库语句来写学生的表
create database if not exists fbzr;
use fbzr;
drop table if exists class_s;  #如果原来存在这个表就要先删除
create table class_s(
  id int not null auto_increment,
  student_name varchar(12) not null default '',             #姓名
  student_sex varchar(3) not null default '',               #性别
  student_date varchar(30) not null default '',             #出生日期
  student_tel varchar(11) not null default '',              #手机号
  student_email varchar(30) not null default '',            #邮箱
  student_place varchar(50) not null default '',            #籍贯
  student_pic varchar(40) not null default '',              #照片
  student_nation varchar(15) not null default '',           #民族
  student_joindate varchar(30) not null default '',         #入学时间
  student_school varchar(30) not null default '',           #学院
  student_profess varchar(30) not null default '',          #专业
  student_classname varchar(30) not null default '',        #班级
  student_xh varchar(30) not null default '',               #学号
  student_duty varchar(20) not null default '',             #职务
  student_score1 int not null default 0,                    #一年级学分绩
  student_mc1 varchar(30) not null default '',              #一年级名次
  student_score2 int not null default 0,                    #二年级学分绩
  student_mc2 varchar(30) not null default '',              #二年级名次
  student_score3 int not null default 0,                    #三年级学分绩
  student_mc3 varchar(30) not null default '',              #三年级名次
  student_score4 int not null default 0,                    #四年级学分绩
  student_mc4 varchar(30) not null default '',              #四年级名次
  student_prize text not null,                              #获奖记录
  student_crtiz text not null,                              #违纪记录
  student_message text not null,                            #老师评价
  primary key(id)
);