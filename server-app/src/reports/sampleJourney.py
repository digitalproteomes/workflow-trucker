#!/usr/bin/python
# -*- coding: utf-8 -*-

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


# can be deleted after integration
def createMockGraph():
    g = Digraph('G', filename='sampleJourney5')

    g.attr(compound='true', label='Sample journey', labelloc='t',
           rank='same', rankdir='TD')

    with g.subgraph(name='cluster_0') as c:
        c.attr(style='filled', color='lemonchiffon', size='8,5',
               fixedsize='True')
        c.node_attr.update(style='filled', color='white', shape='box')
        c.node('Clinical Sample PHRT_005_CPAC')
        c.node('Intermediate Sample IS_005_CPAC')

        # c.edges([('Clinical Sample PHRT_005_CPAC',
        #           'Intermediate Sample IS_005_CPAC')])

        c.attr(label='WETBENCH')

    with g.subgraph(name='cluster_1') as d:
        d.attr(style='filled', color='peachpuff', size='8,5',
               fixedsize='True')
        d.node_attr.update(style='filled', color='white', shape='box')
        d.node('Intermediate Sample IS_005_CPAC')
        d.node('MS Ready Sample MSR_005_CPAC')
        d.attr(label='MS PREP')

    with g.subgraph(name='cluster_2') as e:
        e.attr(style='filled', color='darkseagreen', minlen='8,5',
               fixedsize='True')
        e.node_attr.update(style='filled', color='white', shape='box')
        e.node('MS Ready Sample MSR_005_CPAC')
        e.node('MS Run MS_RUN_465436_PHRT')
        e.attr(label='MASS SPEC')

    with g.subgraph(name='cluster_3') as f:

        f.attr(style='filled', color='powderblue', rank='same')
        f.node_attr.update(style='filled', color='white', shape='box')
        f.node('PHRT_001_005_CPAC_Lib')
        f.node('PHRT_001_005_CPAC_SWATH')
        f.node('ProteinMatrix_005.tsv', shape='tab')
        f.node('PHRT_005_Lib.tsv', shape='tab')
        f.attr(label='COMPUTATIONAL')

    g.edge('PHRT_001_005_CPAC_Lib', 'PHRT_001_005_CPAC_SWATH',
           color='darkgrey')
    g.edge('Intermediate Sample IS_005_CPAC',
           'MS Ready Sample MSR_005_CPAC', color='darkgrey')

    g.edge('MS Run MS_RUN_465436_PHRT', 'PHRT_001_005_CPAC_Lib',
           label='dasop2', color='darkgrey')
    g.edge('MS Run MS_RUN_465436_PHRT', 'PHRT_001_005_CPAC_SWATH',
           label='dasop1', color='darkgrey')

    g.edge('Clinical Sample PHRT_005_CPAC',
           'Intermediate Sample IS_005_CPAC', label='samplesop',
           color='darkgrey')
    g.edge('MS Ready Sample MSR_005_CPAC', 'MS Run MS_RUN_465436_PHRT',
           label='mssop', color='darkgrey')

    g.edge('PHRT_001_005_CPAC_Lib', 'PHRT_005_Lib.tsv',
           label='results', color='darkgrey')
    g.edge('PHRT_001_005_CPAC_SWATH', 'ProteinMatrix_005.tsv',
           label='results', color='darkgrey')

    g.view()


def generateComputationalCluster(g, msRunId, msRunName):
    spl_name = 'Spectral Library N/A'
    spl_id = 'N/A'
    spl_sop = 'SOP N/A'
    spl_file = 'Spectral Library File N/A'
    isSpecLib = False

    swa_name = 'SWATH Analysis N/A'
    swa_sop = 'SOP N/A'
    swa_file = 'Protein Matrix N/A'
    swa_spl_id = 'N/A'
    isSwath = False

    specLibs = spectralLibraryDAO.getLibrariesForMSRun(msRunId)
    if len(specLibs) > 0:
        isSpecLib = True
        specLib = specLibs[0]
        spl_name = specLib['name']
        spl_id = specLib['id']
        spl_sop = specLib['sopFileName']
        spl_file = specLib['specLibFilename']

    swas = swathAnalysisDAO.getSWATHForMSRun(msRunId)
    if len(swas) > 0:
        isSwath = True
        swa = swas[0]
        swa_name = swa['name']
        swa_spl_id = swa['spectralLibraryId']
        swa_sop = swa['sopFileName']
        swa_file = swa['proteinMatrixFileName']

    #  generate fourth subcluster: Computational

    with g.subgraph(name='cluster_3') as f:
        f.attr(style='filled', color='powderblue', rank='same')
        f.node_attr.update(style='filled', color='white', shape='box')

        if isSpecLib:
            f.node(spl_name)
            f.node(spl_file, shape='tab', fontsize='10')
            g.edge(spl_name, spl_file, label='file', color='darkgrey',
                   fontsize='10')
            g.edge(msRunName, spl_name, label=spl_sop,
                   color='darkgrey', fontsize='10')

        if isSwath:
            f.node(swa_name)
            f.node(swa_file, shape='tab', fontsize='10')
            g.edge(swa_name, swa_file, label='file', color='darkgrey',
                   fontsize='10')
            g.edge(msRunName, swa_name, label=swa_sop,
                   color='darkgrey', fontsize='10')

        if isSwath & isSpecLib & (swa_spl_id == spl_id):
            g.edge(swa_name, spl_name, label="uses",
                   color='darkgrey', fontsize='10')

        f.attr(label='COMPUTATIONAL')


def generateMassSpecCluster(g, msr):

    msrun = MSRunDAO.getMsRunsByMSREadySampleId(msr['id'])[0]
    if len(msrun) > 0:
        msrun_name = msrun['name']
        msrun_sop = msrun['sopFileName']
        print(msrun_name)

        with g.subgraph(name='cluster_2') as e:
            e.attr(style='filled', color='darkseagreen', minlen='8,5',
                   fixedsize='True')
            e.node_attr.update(style='filled', color='white',
                               shape='box')
            e.node(msrun_name)
            e.attr(label='MASS SPEC')
            g.edge(msr['name'], msrun_name, label=msrun_sop,
                   color='darkgrey', fontsize='10')
        generateComputationalCluster(g, msrun['id'], msrun_name)


def generateMsPrepCluster(g, ins):
    msrs = \
        msReadySamplesDAO.getMsReadySampleByIntermediateSampleId(ins['id'
                                                                     ])
    if len(msrs) > 0:
        msr = msrs[0]
        msr_name = msr['name']

        #  generate second subcluster: MS Prep

        with g.subgraph(name='cluster_1') as d:
            d.attr(style='filled', color='peachpuff', size='8,5',
                   fixedsize='True')
            d.node_attr.update(style='filled', color='white',
                               shape='box')
            d.node(msr_name)
            d.attr(label='MS PREP')
            g.edge(ins['name'], msr_name, color='darkgrey')

        generateMassSpecCluster(g, msr)


def processSampleJourney(sampleId):
    clinicalSampleName = \
        clinicalSampleDAO.getClinicalSampleById(sampleId)['name']
    g = Digraph('G', filename='sampleJourney')
    g_label = 'Sample journey for clinical sample: ' \
        + clinicalSampleName
    g.attr(compound='true', label=g_label, labelloc='t', rank='same',
           rankdir='TD')

    intermediateSamples = \
        intermediateSampleDAO.getIntermediateSamplesByClinicalSampleId(
            sampleId)

    for ins in intermediateSamples:
        is_name = ins['name']
        is_protocol = ins['sopFileName']

        # generate first subcluster: WETBENCH

        with g.subgraph(name='cluster_0') as c:
            c.attr(style='filled', color='lemonchiffon', size='8,5',
                   fixedsize='True')
            c.node_attr.update(style='filled', color='white',
                               shape='box')
            c.node(clinicalSampleName)
            c.node(is_name)
            c.attr(label='WETBENCH')

        g.edge(
            clinicalSampleName,
            is_name,
            label=is_protocol,
            color='darkgrey',
            constraint='true',
            fontsize='10',
        )

        generateMsPrepCluster(g, ins)

    g.view()


if __name__ == '__main__':
    try:
        if os.environ['WorkflowEnvironment'] == 'Docker':
            db = MongoClient('host.docker.internal', 27017)
        else:
            db = MongoClient('localhost', 27017)
    except KeyError:
        db = MongoClient('localhost', 27017)

    client = db  # MongoClient('localhost', 27017)
    sampleId = \
        clinicalSampleDAO.getClinicalSampleByName('PHRT_005_004_CPAC'
                                                  )['id']
    processSampleJourney(sampleId)

#     createFancyGraph()
