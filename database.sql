-- Membuat table courses
create table courses (
	course_id varchar(4) primary key,
	name_course varchar(50) not null,
	sks integer not null
)

-- Membuat table teachers
create table teachers (
	teacher_id varchar(4) primary key,
	teacher_name varchar(50) not null,
	address varchar(50) not null,
	course_id varchar(4),
	foreign key (course_id) references courses (course_id) on update cascade on delete cascade
)

-- Membuat table majors
create table majors (
	major_id varchar(4) primary key,
	major_name varchar(50) not null,
	head_major varchar(50) not null
)

-- membuat table students
create table students (
	student_id varchar(4) primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	phone_number varchar(20),
	teacher_id varchar(4) not null,
	major_id varchar(4) not null, 
	foreign key (teacher_id) references teachers (teacher_id) on update cascade on delete cascade,
	foreign key (major_id) references majors (major_id) on update cascade on delete cascade
)
-- Mengisi table courses
insert into courses (course_id, course_name, sks) values ('c001', 'pemrogramman web 1', 4);
insert into courses (course_id, course_name, sks) values ('c002', 'pemrogramman web 2', 3);
insert into courses (course_id, course_name, sks) values ('c003', 'algoritma dasar', 2);
insert into courses (course_id, course_name, sks) values ('c004', 'web desain', 4);

-- Mengisi table teachers
insert into teachers (teacher_id, teacher_name, address, course_id) values ('t001', 'udin', 'depok', 'c001');
insert into teachers (teacher_id, teacher_name, address, course_id) values ('t002', 'joko', 'bogor', 'c001');
insert into teachers (teacher_id, teacher_name, address, course_id) values ('t003', 'budi', 'bekasi', 'c003');
insert into teachers (teacher_id, teacher_name, address, course_id) values ('t004', 'supri', 'jakarta', 'c004');
insert into teachers (teacher_id, teacher_name, address, course_id) values ('t005', 'erik', 'tanggerang', 'c001');

-- Mengisi table students
insert into students (student_id, first_name, last_name, phone_number, teacher_id, major_id)
values ('s001', 'Lisman', 'Arsilo', '085212345677', 't001', 'm001');
insert into students (student_id, first_name, last_name, phone_number, teacher_id, major_id)
values ('s002', 'Luluk', 'Fitri', '085212345672', 't002', 'm001');
insert into students (student_id, first_name, last_name, phone_number, teacher_id, major_id)
values ('s003', 'Budi', 'Hendra', '085212345673', 't003', 'm001');
insert into students (student_id, first_name, last_name, phone_number, teacher_id, major_id)
values ('s004', 'Tono', 'Tini', '085212345674', 't003', 'm001');
insert into students (student_id, first_name, last_name, phone_number, teacher_id, major_id)
values ('s005', 'Tiki', 'Taka', '085212345675', 't004', 'm002');

-- Mengisi table majors
insert into majors (major_id, major_name, head_major) values ('m001', 'pemrogramman', 'sutini');
insert into majors (major_id, major_name, head_major) values ('m002', 'desain', 'sutono');


select * from courses
select * from teachers
select * from majors
select * from students

