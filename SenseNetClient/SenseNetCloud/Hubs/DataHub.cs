using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SenseNetCloud.Hubs
{
    public class DataHub : Hub
    {
        public static void Show()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<DataHub>();
            context.Clients.All.displayData();
        
        }
    }
}