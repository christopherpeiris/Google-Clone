import React from "react";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import "./SearchPage.css";
// import Response from "../response";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";

function SearchPage() {
	const [{ term }, dispatch] = useStateValue();

	const { data } = useGoogleSearch(term); // Live Api Call

	// const data = Response;

	console.log("data", data);

	return (
		<div className="searchPage">
			<div className="searchPage__header">
				<Link to="/">
					<img
						className="searchPage__logo"
						src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
						alt="Google"
					/>
				</Link>

				<div className="searchPage__headerBody">
					<Search hideButtons />

					<div className="searchPage__options">
						<div className="searchPage__optionsLeft">
							<div className="searchPage_option">
								<SearchIcon />
								<Link to="/all">All</Link>
							</div>
							<div className="searchPage_option">
								<DescriptionIcon />
								<Link to="/news">News</Link>
							</div>
							<div className="searchPage_option">
								<ImageIcon />
								<Link to="/images">Images</Link>
							</div>
							<div className="searchPage_option">
								<LocalOfferIcon />
								<Link to="/shopping">Shopping</Link>
							</div>
							<div className="searchPage_option">
								<RoomIcon />
								<Link to="/maps">Maps</Link>
							</div>
							<div className="searchPage_option">
								<MoreVertIcon />
								<Link to="/more">More</Link>
							</div>
						</div>

						<div className="searchPage__optionsRight">
							<div className="searchPage_option">
								<Link to="/settings">Settings</Link>
							</div>
							<div className="searchPage_option">
								<Link to="/tools">Tools</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			{term && (
				<div className="searchPage__results">
					<p className="searchPage__resultCount">
						About {data?.searchInformation.formattedTotalResults} results (
						{data?.searchInformation.formattedSearchTime} seconds)
					</p>

					{data?.items.map((item) => (
						<div className="searchPage__result">
							<a href={item.link} className="searchPage__resultTitleMain">
								{item.pagemap?.cse_image?.length > 0 &&
									item.pagemap?.cse_image[0]?.src && (
										<img
											className="searchPage__resultImage"
											src={
												item.pagemap?.cse_image?.length > 0 &&
												item.pagemap?.cse_image[0]?.src
											}
											alt=""
										/>
									)}
								{item.displayLink} <ArrowDropDownOutlinedIcon />
							</a>
							<a href={item.link} className="searchPage__resultTitle">
								<h2>{item.title}</h2>
							</a>
							<p className="searchPage__resultSnippet">{item.snippet}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SearchPage;
