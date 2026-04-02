class VacationService {

    // async fetchData(page: number ): Promise<void>{
    //     const offset: number = (page - 1) * limit;
    //
    //     const response: Response = await fetch(`/api/items?limit=${limit}&offset=${offset}`);
    //
    //     if (!res.ok) {
    //         throw new Error("Failed to fetch data");
    //     }
    //
    //     const result: Item[] = await res.json();
    //
    //     setData(result);
    //
    //     if (result.length > 0) {
    //         setTotal(result[0].total);
    //     } else {
    //         setTotal(0);
    //     }
    // };

}

export const vacationService = new VacationService();