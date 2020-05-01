import React, { Component } from 'react'
import axios from 'axios'

import Block from './Block'
import LoadMore from './LoadMore'
import './InfiniteScroll.css';

class InfiniteScroll extends Component {
    constructor(props) {
        super(props)

        this.state = {
          urls: {},
          urlslist: [],
          columns: 2,
          loading: false,
          isLoadMore: true
        }
        this.isScrolling = false
    }
    
    // For attacching the scroll event
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let th = this 
        // Too avoid multiple calls
        window.clearTimeout( this.isScrolling );
        this.isScrolling = setTimeout(function(e) {   
            if (th.state.isLoadMore) {
                th.setState({isLoadMore:  false})
            } 
            if (!th.state.loading && (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight)) {
                th.fetchData()
            }            
        }, 100);
    }

    

    fetchData = () => {
        this.setState({ loading: true });
        const one = axios.get('https://aws.random.cat/meow')
        const two = axios.get('https://random.dog/woof.json')

        axios.all([one, two])
            .then(axios.spread((...responses) => {
                this.setState({urls: {...this.state.urls, [responses[0].data.file]: ""}})
                this.setState({urls:{...this.state.urls, [responses[1].data.url] : ""}})
                this.setState({ loading: false });
                this.reorder(Object.keys(this.state.urls), this.state.columns)
                if(this.state.isLoadMore)
                    this.checkLoadMore()
                })
            )
            .catch(errors => {
                console.log(errors)
            })
    }

    componentDidMount() {
        this.fetchData()
        
    }

    reorder = (arr, columns) => {
        const list = [];
        let col = 0;
        while(col < columns) {
            for(let i = 0; i < arr.length; i += columns) {
                if (arr[i + col] !== undefined)
                    list.push(arr[i + col]);
            }
            col++;
        }
        this.setState({ urlslist: list});
    }

    isImage(url) {
        return !(url.indexOf(".mp4") > 0)
    }
    checkLoadMore() {
        this.setState({ isLoadMore: (document.documentElement.scrollHeight <= document.documentElement.clientHeight)}) 
    }
    
    render() {
        return (
            <div>
                <div className="blocks" style={{"columnCount" : this.state.columns}}>
                    {this.state.urlslist.map((url, i) => (
                        <Block key={i} url={url} isImage={this.isImage(url)}/>
                    ))}
                </div>
                {this.state.isLoadMore ? <LoadMore fetchData={this.fetchData}/>: ''}
            </div>
        )
    }
}

export default InfiniteScroll;