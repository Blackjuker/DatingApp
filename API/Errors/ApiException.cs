using System;

namespace API.Errors;

public class ApiException(int statausCode, string message, string? details = null)
{
    public int StatusCode { get; set; } = statausCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;

}
