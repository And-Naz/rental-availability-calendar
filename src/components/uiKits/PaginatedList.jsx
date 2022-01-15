import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import List from "./List";

function PaginatedList({
	records, isLoading, active, changeActiv, recordsPerPage, pages, goToPage, keyName
}) {
	const [currentRecords, setCurrentRecords] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	useEffect(() => {
		setCurrentRecords(records);
		setPageCount(pages);
	}, [records, pages]);
	const handlePageClick = (event) => {
		debugger
		console.log(event);
		goToPage(event.selected)
	};
	return (
		<div style={{ border: "1px solid black" }}>
			<ReactPaginate
				className="pagination"
				breakLabel="..."
				nextLabel="next"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="previous"
				renderOnZeroPageCount={null}
			/>
			<List currentRecords={currentRecords} keyName={keyName} />
		</div>
	);
}

export default PaginatedList;