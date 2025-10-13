using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; } // cloud storage

    // Navigation property

    public string MemberId { get; set; } = null!;
    [JsonIgnore]
    public Member Member { get; set; } = null!;  /// one member can have many photos
}
