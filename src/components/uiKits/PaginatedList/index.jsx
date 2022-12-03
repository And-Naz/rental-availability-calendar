import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import List from "./List";
import Checkbox from "../Checkbox";
import "./style.css"

function PaginatedList({
	records = [], isLoading = false, active = null, onListClick = Function.prototype,
	pages = 0, goToPage = Function.prototype, keyName = "", displayName = "",
	isCheckedFunc = Function.prototype, selectAll = Function.prototype, isAllSelected = false
}) {
	const [currentRecords, setCurrentRecords] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	useEffect(() => {
		setCurrentRecords(records);
		setPageCount(pages);
	}, [records, pages]);
	const handlePageClick = useCallback((event) => { goToPage(event.selected) }, [goToPage]);
	return (
		<div className="list">
			<div className="list__select_all">
				<Checkbox checked={isAllSelected} onClick={selectAll}>Select All</Checkbox>
			</div>
			<List
				className="list__items"
				currentRecords={currentRecords}
				keyName={keyName}
				displayName={displayName}
				active={active}
				isLoading={isLoading}
				onListClick={onListClick}
				isCheckedFunc={isCheckedFunc}
			/>
			<ReactPaginate
				className="list__pagination"
				pageClassName="list__page"
				activeClassName="list__page--active"
				breakClassName="list__page__break"
				previousClassName="list__page list__page--previous"
				nextClassName=" list__page list__page--next"
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
			{
				pageCount === 0 && <ul className="list__pagination--blank"></ul>
			}
		</div >
	);
}

export default PaginatedList;