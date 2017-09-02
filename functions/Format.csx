#r "Newtonsoft.Json"

using System.Globalization;
using System.Net;
using Newtonsoft.Json;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // deserialize content to FormatRequest
    var formatRequest = await TryDeserializeRequest(req, log);

    // make sure both value and pattern were provided
    if (string.IsNullOrEmpty(formatRequest?.Value) || string.IsNullOrEmpty(formatRequest?.Pattern))
    {
        return req.CreateResponse(HttpStatusCode.BadRequest);
    }

    log.Info($"value: '{formatRequest?.Value}', pattern: '{formatRequest?.Pattern}'");

    var response = GetResponse(formatRequest);

    log.Info($"response: {JsonConvert.SerializeObject(response)}");

    return req.CreateResponse(HttpStatusCode.OK, response);
}

private static async Task<FormatRequest> TryDeserializeRequest(HttpRequestMessage req, TraceWriter log)
{
    try
    {
        string content = await req.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<FormatRequest>(await req.Content.ReadAsStringAsync());
    }
    catch(Exception)
    {
        log.Error("Can't parse the request.");
        return null;
    }
}

private static FormatResult GetResponse(FormatRequest request)
{
    try
    {
        var dateTimeValue = DateTime.Parse(request.Value.Trim('"'), CultureInfo.InvariantCulture);
        var formattedString = dateTimeValue.ToString(request.Pattern);
        return new FormatResult { FormattedValue = formattedString };
    }
    catch (Exception ex)
    {
        return new FormatResult { Error = new Error { Message = ex.Message, ExceptionName = ex.GetType().Name } };
    }
}

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