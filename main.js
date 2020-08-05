import { ToyReact, Component } from './ToyReact.js';

class MyComponent extends Component {
  render() {
  return <div>
    <span>hello</span><span>world</span>
    {this.children}
    {true}
    </div>
  }
} 

let a  = <MyComponent name="test" id="ida">
  <div>chidlren div</div>
</MyComponent>;

ToyReact.render(a, document.body)

// document.body.appendChild(a)