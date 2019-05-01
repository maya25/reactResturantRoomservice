export const MAINTENANCE_OPTIONS = [
    'tv',
    'safe',
    'ac',
    'shower',
    'remote',
    'kettle',
];

export const SERVICES = {
    CLEANING: 'clean',
    ALARM: 'alarm',
    MAINTENANCE: 'maintenance',
    MISSING_ITEMS: 'missing',
};

export const TRANSLATIONS = {
    SERVICES: {
        CLEANING: 'ניקיון',
        ALARM: 'השכמה',
        MAINTENANCE: 'תחזוקה',
        MISSING_ITEMS: 'חוסרים בחדרים',
    },
    BLANKET: 'שמיכה',
    PILLOW: 'כרית',
    SHAMPOO: 'שמפו',
    TOWEL: 'מגבת',
    [SERVICES.MISSING_ITEMS]: 'חוסרים בחדרים',
    [SERVICES.MAINTENANCE]: 'תחזוקה',
    [SERVICES.CLEANING]: 'ניקיון',
    [SERVICES.ALARM]: 'השכמה',
    REQUEST_RECEIVED: 'בקשתך התקבלה ותטופל בהקדם האפשרי',
    MAINTENANCE: {
        TV: 'טלויזיה מקולקלת',
        SAFE: 'כספת תקולה',
        AC: 'מזגן לא עובד',
        SHOWER: 'אין מים חמים במקלחת',
        REMOTE: 'שלט מקולקל',
        KETTLE: 'קומקום לא עובד'
    },
    CLEANING_false: 'לא מעוניין בניקיון',
    CLEANING_true: 'מעוניין בניקיון',
    BOOKING: {
        CONFIRMED: 'הזמנתכם בוצעה בהצלחה בתאבון!',
        DECLINED: 'מצטערים, חדר אוכל בתפוסה מלאה',
        COMPENSATE: 'לחצו כאן לשירות חלופי',
    },
    VOUCHERS: {
        BAR: 'בר הבריכה',
        LOBBY: 'לובי המלון',
        ROOM_SERVICE: 'שירות חדרים'
    },
    CONFIRM: 'אישור',
    DECLINE: 'ביטול',
    MEALS: {
        breakfast: 'ארוחת בוקר',
        lunch: 'ארוחת צהריים',
        dinner: 'ארוחת ערב',
    }
};

export const BOOKING_STATUSES = {
    CONFIRMED: 'confirmed',
    DECLINED: 'declined',
    NA: 'na',
};

export const ERRORS = {
  'user already ordered table for that meal': 'קיימת כבר הזמנה לארוחה הזאת במועד המבוקש',
};

export const HOTEL_ID = '5cb7225c7df76e2dace0d318';
export const ROOM_ID = '5cc80e4b349ad956c4e31f36';
export const USER_ID = '2';

export const BASE_URL = 'https://mayhotel.herokuapp.com';
