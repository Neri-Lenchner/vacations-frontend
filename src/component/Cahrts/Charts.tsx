import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import { useEffect, useState } from "react";
import {VacationDestinationIdModel} from "../../models/vacation-destinationId.model";
import {followersService} from "../../services/followers-service";

function Charts() {

    const [vacationDestinationAndIdList, setVacationDestinationIdList] = useState<VacationDestinationIdModel[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data: VacationDestinationIdModel[] = await followersService.getVacationDestinationWithFollowerCount();
            setVacationDestinationIdList(data);
        }
        void fetchData();
    }, []);


    function getBackgroundColors(): string[] {
        return vacationDestinationAndIdList.map((_vacation, i): string => {
            const hue: number = (i * 360) / vacationDestinationAndIdList.length;
            return `hsl(${hue}, 65%, 55%)`;
        });
    }

    return (
        <div className="Charts-container">
            <Bar
                data={{
                    labels: vacationDestinationAndIdList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Followers Map",
                            data: vacationDestinationAndIdList.map(vacation => vacation.followerCount || 0),
                            backgroundColor: getBackgroundColors(),
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
}

export default Charts;