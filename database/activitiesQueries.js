const { getOneActivity } = require("../controllers/activities.controller")

const activitiesQueries = {
  getCalendarScheduleID: `select cs.id
                          from Calendar  c
                          join CalendarSchedule cs on cs.CalendarID = c.id
                          join Schedule h on cs.ScheduleID = h.id
                          join Subjects s on h.SubjectID = s.id
                          where thedate =  @date
                          and s.SubjectName = @subject`,
  getOneActivity: `
                select a.*, cast(c.TheDate as date) as ActivityDate, sb.SubjectName
                from Activities a
                join CalendarSchedule cs on cs.ID = a.CalendarScheduleID
                join Calendar c on c.ID = cs.CalendarID
                join Schedule s on s.ID = cs.ScheduleID
                join Subjects sb on sb.ID = s.SubjectID
                where a.id = @id
                `,
  getAllActivities: `
                  select a.*, sb.SubjectName, c.TheDate
                  from Activities a
                  join CalendarSchedule cs on cs.ID = a.CalendarScheduleID
                  join Calendar c on c.ID = cs.CalendarID
                  join Schedule s on s.ID = cs.ScheduleID
                  join Subjects sb on sb.ID = s.SubjectID                  
                  where a.ActivityName is not null
                  `,  
  createOneActivity: `insert into Activities (ActivityName, ActivityDesc, ActivityType, ActivityGrade, CalendarScheduleID)
                    values                     
                    (@activityName, @activityDesc, @activityType, @activityGrade, @calendarScheduleId)
                    select * from Activities where id = SCOPE_IDENTITY();
                    `,   
  updateOneActivity: `update s 
                      set ActivityName = @activityName
                          , ActivityDesc = @activityDesc
                          , s.ActivityType = @activityType
                          , s.ActivityGrade =  @activityGrade
                          , s.CalendarScheduleID = sc.ID                        
                      from Activities s 
                      join Calendar c on cast(c.TheDate as date) = cast(@date as date)
                      join CalendarSchedule sc on sc.CalendarID = c.ID
                      join Schedule sd on sd.ID = sc.ScheduleID
                      join Subjects sj on sj.ID = sd.SubjectID
                      where s.id = @activityId
                      and sj.SubjectName = @subjectName
                    `,
  deleteOneActivity: `delete from Activities where ID = @id`,
}

module.exports = activitiesQueries