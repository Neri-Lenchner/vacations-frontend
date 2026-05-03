import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import { useEffect, useState, useRef } from "react";
import {DestinationAndFollowersCountModel} from "../../models/destination-and-followers-count.model";
import {followersService} from "../../services/followers-service";

function Charts() {

    const [vacationDestinationAndIdList, setVacationDestinationIdList] = useState<DestinationAndFollowersCountModel[]>([]);
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const data: DestinationAndFollowersCountModel[] = await followersService.getVacationDestinationWithFollowerCount();
            setVacationDestinationIdList(data);

            const containerElement: HTMLDivElement | null =  container.current;
            if (containerElement) containerElement.scrollIntoView();

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
        <div className="Charts-container" ref={container}>
            <Bar
                data={{
                    labels: vacationDestinationAndIdList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Number Of Followers",
                            data: vacationDestinationAndIdList.map(vacation => vacation.followerCount || 0),
                            backgroundColor: getBackgroundColors(),
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }}
            />
        </div>
    );
}

export default Charts;