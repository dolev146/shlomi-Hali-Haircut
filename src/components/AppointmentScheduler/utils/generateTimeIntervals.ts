export const generateTimeIntervals = (start: string, end: string): string[] => {
    const timeIntervals: string[] = [];

    const parseTime = (time: string): [number, number] => {
        const [hours, minutes] = time.split(':').map(Number);
        return [hours, minutes];
    };

    const formatTime = (hours: number, minutes: number): string => {
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = minutes.toString().padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}`;
    };

    const incrementTime = (hours: number, minutes: number, increment: number): [number, number] => {
        minutes += increment;
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes %= 60;
        }
        return [hours, minutes];
    };

    let [currentHour, currentMinute] = parseTime(start);
    const [endHour, endMinute] = parseTime(end);

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const startInterval = formatTime(currentHour, currentMinute);
        [currentHour, currentMinute] = incrementTime(currentHour, currentMinute, 30);
        const endInterval = formatTime(currentHour, currentMinute);
        timeIntervals.push(`${startInterval}-${endInterval}`);
    }

    return timeIntervals;
}
