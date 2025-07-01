"use client"

import { DateRangePicker } from "@heroui/react";
import { useState } from "react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";


export function CalendarTest() {
    const [value, setValue] = useState({
        start: parseDate("2025-06-23"),
        end: parseDate("2025-06-24"),
    });

    const formatter = useDateFormatter({ dateStyle: "long" });
    return (
        <div>
            <div className="max-w-sm">
                <DateRangePicker className="hidden md:block" visibleMonths={2} value={value} onChange={(value) => value && setValue(value)} />
                <DateRangePicker className="md:hidden" value={value} onChange={(value) => value && setValue((value))} />
            </div>
            <div>
                <p>{formatter.format(value.start.toDate("Africa/Abidjan"))}</p>
                <p>{formatter.format(value.end.toDate("Africa/Abidjan"))}</p>
            </div>
        </div>
    );
}