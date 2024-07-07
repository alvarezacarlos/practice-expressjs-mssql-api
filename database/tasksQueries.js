const tasksQueries = {
  getCalendarScheduleID:` select cs.id
                          from Calendar  c
                          join CalendarSchedule cs on cs.CalendarID = c.id
                          join Schedule h on cs.ScheduleID = h.id
                          join Subjects s on h.SubjectID = s.id
                          where thedate =  @date
                          and s.SubjectName = @subject
                        `,
  getOneTask: `
                select a.*, cast(c.TheDate as date) as TaskDate, sb.SubjectName
                from Tasks a
                join CalendarSchedule cs on cs.ID = a.CalendarScheduleID
                join Calendar c on c.ID = cs.CalendarID
                join Schedule s on s.ID = cs.ScheduleID
                join Subjects sb on sb.ID = s.SubjectID
                where a.id = @id
              `,
  getAllTasks: `
              select a.*, sb.SubjectName, c.TheDate
              from Tasks a
              join CalendarSchedule cs on cs.ID = a.CalendarScheduleID
              join Calendar c on c.ID = cs.CalendarID
              join Schedule s on s.ID = cs.ScheduleID
              join Subjects sb on sb.ID = s.SubjectID                  
              where a.TaskName is not null`,
  createOneTask: `insert into Tasks (TaskName, TaskDesc, TaskType, TaskGrade, CalendarScheduleID)
                values 
                (@taskName, @taskDesc, @taskType, @taskGrade, @calendarScheduleID)
                select * from Tasks where id = SCOPE_IDENTITY();
                `,
  updateOneTask: `update s 
                  set TaskName = @taskName
                      , TaskDesc = @taskDesc
                      , s.TaskType = @taskType
                      , s.TaskGrade =  @taskGrade
                      , s.CalendarScheduleID = sc.ID
                  from Tasks s 
                  join Calendar c on cast(c.TheDate as date) = cast(@date as date)
                  join CalendarSchedule sc on sc.CalendarID = c.ID
                  join Schedule sd on sd.ID = sc.ScheduleID
                  join Subjects sj on sj.ID = sd.SubjectID
                  where s.id = @taskId
                  and sj.SubjectName = @subjectName
                `,
  deleteOneTask: `delete from Tasks where ID = @id`,
}

module.exports = tasksQueries