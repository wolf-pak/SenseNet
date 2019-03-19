using SenseNetCloud.Hubs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SenseNetCloud.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LightData()
        {
            //ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult TemperatureData()
        {
            //ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult Get()
        {

            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SenseClientConnection"].ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(@"SELECT id, time, value, type, node, sensorId FROM [dbo].[SensorState]", connection))
                {
                    // Make sure the command object does not already have
                    // a notification object associated with it.
                    command.Notification = null;

                    SqlDependency dependency = new SqlDependency(command);
                    dependency.OnChange += new OnChangeEventHandler(dependency_OnChange);

                    if (connection.State == ConnectionState.Closed)
                        connection.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    var listData = reader.Cast<IDataRecord>()
                            .Select(x => new
                            {
                                Id = (int)x["id"],
                                Time = ((DateTime)x["time"]).ToString("yyyy-MM-dd HH:mm:ss.fff"),
                                Value = (string)x["value"],
                                Type = (string)x["type"],
                                Node = (string)x["node"],
                                SensorId = (string)x["sensorId"],
                            }).ToList();

                    return Json(new { listData = listData }, JsonRequestBehavior.AllowGet);

                }
            }
        }

        private void dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {

            DataHub.Show();
        }
    }
}
    