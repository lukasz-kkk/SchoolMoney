﻿namespace PrzedszkolePlus.Response
{
    public class MealResponse
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public DateOnly Date { get; set; }
        public string Breakfast { get; set; }
        public string Lunch { get; set; }
        public string Dinner { get; set; }
    }
}