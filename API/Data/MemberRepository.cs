using System;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<Member?> GetMemberForUpdate(string id)
    {
        return await context.Members
            .Include(x => x.User)
            .Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<PaginatedResult<Member>> GetMembersAsync(MemberParams memberParams)
    {
        var query = context.Members.AsQueryable();

        query = query.Where(m => m.Id != memberParams.CurrentMemberId); // Exclude current member

        if (memberParams.Gender is not null)
        {
            query = query.Where(m => m.Gender == memberParams.Gender); // Filter by
        }


        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-memberParams.MaxAge - 1));// +1 to include the max age
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-memberParams.MinAge));// no +1 to include the min age

        query = query.Where(m => m.DateOfBirth >= minDob && m.DateOfBirth <= maxDob); // Filter by age range

        // Sorting
        query = memberParams.OrderBy switch
        {
            "created" => query.OrderByDescending(m => m.Created),
            _ => query.OrderByDescending(m => m.LastActive)
        };
        
        return await PaginationHelper.CreateAsync(query, memberParams.PageNumber, memberParams.PageSize);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId)
    {
        return await context.Members
        .Where(x => x.Id == memberId)
        .SelectMany(x => x.Photos)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}
