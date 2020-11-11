from matplotlib.pyplot import title
import pygraphviz as pgv
from graphviz import Digraph
import matplotlib.pyplot as plt
import json
from persistence import clinicalSampleDAO
from persistence import projectDAO
from persistence import MSRunDAO
from persistence import spectralLibraryDAO
from persistence import intermediateSampleDAO
from persistence import swathAnalysisDAO
from persistence import msReadySamplesDAO
import datetime
from pymongo import MongoClient
import re

import os


def createGraph(sample):
    # A = pgv.AGraph()

    # A.add_edge("Clinical", "Intermediate")
    # A.add_edge("Intermediate", "Ms_Ready")
    # A.add_edge("Ms_Ready", "MS_Run")

    # print(A.string())  # print to screen
    # print("Wrote simple.dot")
    # A.write("simple.dot")  # write to simple.dot

    # B = pgv.AGraph("simple.dot")  # create a new graph from file
    # B.layout()  # layout with default (neato)
    # B.draw("simple.png")  # draw png
    # print("Wrote simple.png")

    # strict (no parallel edges)
    # digraph
    # with attribute rankdir set to 'LR'
    A = pgv.AGraph(directed=True, strict=True, rankdir="LR")
    # add node 1 with color red
    A.add_node(1, color="red")
    A.add_node(5, color="blue")
    # add some edges
    A.add_edge(1, 2, color="green")
    A.add_edge(2, 3)
    A.add_edge(1, 3)
    A.add_edge(3, 4)
    A.add_edge(3, 5)
    A.add_edge(3, 6)
    A.add_edge(4, 6)
    # adjust a graph parameter
    A.graph_attr["epsilon"] = "0.001"
    print(A.string())  # print dot file to standard output
    A.layout("dot")  # layout with dot
    A.draw("foo.png")  # write to file

    g = pgv.AGraph(name='root')

    g.add_subgraph(name='WETBENCH')
    c1 = g.subgraphs()[-1]
    c1.add_node('A')

    g.add_subgraph(name='MS PREP')
    c2 = g.subgraphs()[-1]
    c2.add_node('B')

    g.add_subgraph(name='MASS SPEC')
    c3 = g.subgraphs()[-1]
    c3.add_node('C')

    g.add_subgraph(name='COMPUTATIONAL')
    c4 = g.subgraphs()[-1]
    c4.add_node('D')

    g.layout("dot")  # layout with dot
    g.draw("g.png")

    # subgraph cluster_0 {
    #     style = filled
    #     color = lightgrey
    #     node [style = filled, color = white]
    #     "Clinical Sample:PHRT_005_CPAC" -> "Intermediate Sample:IS_005_CPAC"
    #     label = "WETBENCH"
    # }

    # subgraph cluster_1 {
    #     "MS Ready Sample:MSR_005_CPAC"
    #     label = "MS PREP"
    #     style = filled
    #     color = pink
    #     node [style = filled, color = white]
    # }

    # subgraph cluster_2 {
    #     "MS Run: RUN_465436"
    #     label = "MASS SPEC"
    #     style = filled
    #     color = orange
    #     node [style = filled, color = white]
    # }

    # subgraph cluster_3 {
    #     "PHRT_001_005_CPAC_Lib" -> "PHRT_001_005_CPAC_SWATH"
    #     label = "COMPUTATIONAL"
    #     style = filled
    #     color = lightgreen
    #     node [style = filled, color = white]
    # }

    # "Intermediate Sample:IS_005_CPAC" -> "MS Ready Sample:MSR_005_CPAC";
    # "MS Ready Sample:MSR_005_CPAC" -> "MS Run: RUN_465436";
    # "MS Run: RUN_465436" ->"PHRT_001_005_CPAC_Lib"
    # "MS Run: RUN_465436" ->"PHRT_001_005_CPAC_SWATH"


def createFancyGraph():
    g = Digraph('G', filename='sampleJourney5')
    g.attr(rankdir='TD')

    # NOTE: the subgraph name needs to begin with 'cluster' (all lowercase)
    #       so that Graphviz recognizes it as a special cluster subgraph

    with g.subgraph(name='cluster_0') as c:
        c.attr(style='filled', color='antiquewhite2',
               size='8,5', fixedsize="True")
        c.node_attr.update(style='filled', color='white', shape='box')
        c.node('Clinical Sample PHRT_005_CPAC')
        c.node('Intermediate Sample IS_005_CPAC')
        # c.edges([('Clinical Sample PHRT_005_CPAC',
        #           'Intermediate Sample IS_005_CPAC')])
        c.attr(label='WETBENCH')

    with g.subgraph(name='cluster_1') as d:
        d.attr(style='filled', color='darksalmon',
               size='8,5', fixedsize="True")
        d.node_attr.update(style='filled', color='white', shape='box')
        d.node('Intermediate Sample IS_005_CPAC')
        d.node('MS Ready Sample MSR_005_CPAC')
        d.attr(label='MS PREP')

    with g.subgraph(name='cluster_2') as e:
        e.attr(style='filled', color='lightblue',
               minlen='8,5', fixedsize="True")
        e.node_attr.update(style='filled', color='white', shape='box')
        e.node('MS Ready Sample MSR_005_CPAC')
        e.node('MS Run RUN_465436')
        e.attr(label='MASS SPEC')

    with g.subgraph(name='cluster_3') as f:
        f.attr(style='filled', color='darkolivegreen3',
               size='8,5', fixedsize="True")
        f.node_attr.update(style='filled', color='white', shape='box')
        f.node('PHRT_001_005_CPAC_Lib')
        f.node('PHRT_001_005_CPAC_SWATH')
        f.attr(label='COMPUTATIONAL')

    g.edge('PHRT_001_005_CPAC_Lib', 'PHRT_001_005_CPAC_SWATH', color="darkgrey")
    g.edge('Intermediate Sample IS_005_CPAC',
           'MS Ready Sample MSR_005_CPAC', color="darkgrey")

    g.edge('MS Run RUN_465436', 'PHRT_001_005_CPAC_Lib',
           label="data analysis sop name", color="darkgrey")
    g.edge('MS Run RUN_465436', 'PHRT_001_005_CPAC_SWATH',
           label="data analysis sop name 2", color="darkgrey")

    g.edge('Clinical Sample PHRT_005_CPAC',
           'Intermediate Sample IS_005_CPAC', label="sample sop name", color="darkgrey")
    g.edge('MS Ready Sample MSR_005_CPAC',
           'MS Run RUN_465436', label="ms sop name", color="darkgrey")

    g.node('ProteinMatrixFileName', shape='tab',
           color="lightgrey", style='filled')
    g.node('SpectralLibFileName', shape='tab',
           color="lightgrey", style='filled')
    g.edge('PHRT_001_005_CPAC_Lib', 'SpectralLibFileName',
           label="results file", color="darkgrey")
    g.edge('PHRT_001_005_CPAC_SWATH',
           'ProteinMatrixFileName', label="results file", color="darkgrey")
    g.view()
    # plt.savefig("fancy.png")


if __name__ == '__main__':
    try:
        if (os.environ['WorkflowEnvironment'] == "Docker"):
            db = MongoClient('host.docker.internal', 27017)
        else:
            db = MongoClient('localhost', 27017)
    except KeyError:
        db = MongoClient('localhost', 27017)

    client = db  # MongoClient('localhost', 27017)
    sample = {}
    # createGraph(sample)
    createFancyGraph()
