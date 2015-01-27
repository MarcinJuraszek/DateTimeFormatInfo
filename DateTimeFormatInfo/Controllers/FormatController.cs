using System;
using System.Globalization;
using System.Web.Http;
using Microsoft.ApplicationInsights;
using System.Collections.Generic;

namespace DateTimeFormatInfo.Controllers
{
    public class FormatResult
    {
        public string FormattedValue { get; set; }
        public Error Error { get; set; }
    }

    public class Error
    {
        public string Message { get; set; }
        public string ExceptionName { get; set; }
    }

    public class FormatRequest
    {
        public string Value { get; set; }
        public string Pattern { get; set; }
    }

    public class FormatController : ApiController
    {
        [HttpPost]
        public FormatResult Post([FromBody] FormatRequest request)
        {
            bool success = false;

            try
            {
                var dateTimeValue = DateTime.Parse(request.Value.Trim('"'), CultureInfo.InvariantCulture);
                var formattedString = dateTimeValue.ToString(request.Pattern);
                success = true;
                return new FormatResult { FormattedValue = formattedString };
            }
            catch (Exception ex)
            {
                return new FormatResult { Error = new Error { Message = ex.Message, ExceptionName = ex.GetType().Name } };
            }
            finally
            {
                var telemetryClient = new TelemetryClient();
                var properties = new Dictionary<string, string>() { { "Success", success.ToString() } };
                telemetryClient.TrackEvent("FormatResult/Post", properties, null);
            }
        }
    }
}
