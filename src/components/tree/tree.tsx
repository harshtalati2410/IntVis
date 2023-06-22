// import { DataSet } from 'vis-data';
import styles from './tree.module.scss';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

export interface TreeProps {
    className?: string;
    nodes:React.MutableRefObject<DataSet<any, "id">>;
    edges:React.MutableRefObject<DataSet<any, "id">>;
}
const options = {
    autoResize: true,
    layout: {
        hierarchical: {
            enabled: true,
            levelSeparation: 200,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: false,
            edgeMinimization: false,
            parentCentralization: true,
            direction: 'UD',
            sortMethod: 'directed',
            shakeTowards: 'roots',
        },
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
                type: 'arrow',
            },
        },
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: false,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomSpeed: 1,
        zoomView: true,
    },
    physics: {
        enabled: false,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
            springLength: 20,
            springConstant: 0.2,
            damping: 0.9,
            centralGravity: 0.01,
        },
    },
};
/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Tree = ({ className,nodes,edges }: TreeProps) => {
    let tree_network=useRef<Network|null>(null);
    const visJsRef = useRef<HTMLDivElement>(null);
    const func = () => {
        tree_network.current =
            visJsRef.current &&
            new Network(visJsRef.current, { nodes: nodes.current, edges: edges.current }, options);
       tree_network.current?.fit({ animation: true, minZoomLevel: 0.1, maxZoomLevel: 0.25 });
    };
    useEffect(func, [visJsRef]);
    return  <div id={styles['container']}>
    <div ref={visJsRef} className={styles['Network']}></div>
</div>
};