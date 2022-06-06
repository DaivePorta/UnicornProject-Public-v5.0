
Public Class OPOperaciones

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearTipoOperacion(ByVal descripcion As String, ByVal estado As String, ByVal usuario As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_CrearTipoOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoTipoOP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CodigoTipoOP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarTipoOperacion(ByVal codigo_tipoOP As String, ByVal descripcion As String, ByVal estado As String, ByVal tipo_act As String, ByVal usuario As String) As String

        Try
            'tipo_act indicador  si su valor es "1" actualiza todos los datos; si su valor es "2" actualiza solamente el estado
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ActualizarTipoOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoTipoOP", codigo_tipoOP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoActual", IIf(tipo_act.Equals(""), 1, tipo_act), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Respuesta", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_Respuesta").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarTipoOperaciones(ByVal codigo_tiopOP As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarTipoOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CodigoTipoOP", IIf(codigo_tiopOP.Equals(""), Nothing, codigo_tiopOP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_Estado", IIf(estado.Equals(""), Nothing, IIf(estado.Equals("A"), True, False)), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearOperacion(ByVal code_empresa As String, ByVal code_tipo_op As String, ByVal descripcion As String,
                                   ByVal mostrar_ind As String,
                                   ByVal proc_int_ind As String, ByVal gen_asinto_ind As String, ByVal comp_ind As String,
                                   ByVal autom_ind As String, ByVal periodicidad As String, ByVal numplazo As String,
                                   ByVal plazo As String, ByVal tipopersona As String, ByVal documento As String,
                                   ByVal estado As String, ByVal usuario As String, ByVal oDetalleMoneda As String,
                                   ByVal oDetalleEstado As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_CrearOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoOP", code_tipo_op, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", code_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_mostrar", IIf(mostrar_ind.Equals(""), Nothing, mostrar_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_procInt", IIf(proc_int_ind.Equals(""), Nothing, proc_int_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GenAsintoInd", IIf(gen_asinto_ind.Equals(""), Nothing, gen_asinto_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AutomaticaInd", IIf(autom_ind.Equals(""), Nothing, autom_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPeriodicidad", IIf(periodicidad.Equals(""), Nothing, periodicidad), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Plazo", IIf(numplazo.Equals("0"), Nothing, numplazo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlazo", IIf(plazo.Equals(""), Nothing, plazo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoPersona", tipopersona, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocumento", IIf(documento.Equals(""), Nothing, documento), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OperacionesxTipoMoneda", oDetalleMoneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OperacionesxEstado", oDetalleEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", String.Empty, ParameterDirection.Output, 253))

            'Dim param As New SqlParameter("@petyOperacionesxTipoMoneda", oDetalleMoneda)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "TypeOperacionesxTipoMoneda"
            'cmd.Parameters.Add(param)

            'Dim param1 As New SqlParameter("@petyOperacionesxEstado", oDetalleEstado)
            'param1.SqlDbType = SqlDbType.Structured
            'param1.TypeName = "TypeOperacionesxEstado"
            'cmd.Parameters.Add(param1)


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CodigoOP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarOperacion(ByVal code_empresa As String, ByVal code_op As String, ByVal code_tipo_op As String, ByVal descripcion As String,
                                        ByVal mostrar_ind As String,
                                        ByVal proc_int_ind As String, ByVal gen_asiento_ind As String, ByVal comp_ind As String,
                                        ByVal autom_ind As String, ByVal periodicidad As String, ByVal numplazo As String,
                                        ByVal plazo As String, ByVal tipopersona As String, ByVal documento As String,
                                        ByVal estado As String, ByVal usuario As String, ByVal oDetalleMoneda As String,
                                        ByVal oDetalleEstado As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_ActualizarOperacion", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", code_op, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoOP", code_tipo_op, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", code_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_mostrar", IIf(mostrar_ind.Equals(""), Nothing, mostrar_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_procInt", IIf(proc_int_ind.Equals(""), Nothing, proc_int_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GenAsintoInd", IIf(gen_asiento_ind.Equals(""), Nothing, gen_asiento_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AutomaticaInd", IIf(autom_ind.Equals(""), Nothing, autom_ind), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPeriodicidad", IIf(periodicidad.Equals(""), Nothing, periodicidad), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Plazo", IIf(numplazo.Equals("0"), Nothing, numplazo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlazo", IIf(plazo.Equals(""), Nothing, plazo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoPersona", tipopersona, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocumento", IIf(documento.Equals(""), Nothing, documento), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OperacionesxTipoMoneda", oDetalleMoneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OperacionesxEstado", oDetalleEstado, ParameterDirection.Input, 253))

            'Dim param As New SqlParameter("@petyOperacionesxTipoMoneda", oDetalleMoneda)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "TypeOperacionesxTipoMoneda"
            'cmd.Parameters.Add(param)

            'Dim param1 As New SqlParameter("@petyOperacionesxEstado", oDetalleEstado)
            'param1.SqlDbType = SqlDbType.Structured
            'param1.TypeName = "TypeOperacionesxEstado"
            'cmd.Parameters.Add(param1)

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperaciones(ByVal empresa As String, ByVal codigo_OP As String, ByVal codigo_tiopOP As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", IIf(codigo_OP.Equals(""), Nothing, codigo_OP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoOP", IIf(codigo_tiopOP.Equals(""), Nothing, codigo_tiopOP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperacionxTipoMoneda(ByVal empresa As String, ByVal codigo_OP As String, ByVal codMoneda As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarOperacionxTipoMoneda", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", IIf(codigo_OP.Equals(""), Nothing, codigo_OP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoMoneda", IIf(codMoneda.Equals(""), Nothing, codMoneda), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperacionxEstado(ByVal empresa As String, ByVal codigo_OP As String, ByVal IdEsTado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarOperacionxEstado", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", IIf(codigo_OP.Equals(""), Nothing, codigo_OP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IdEstado", IIf(IdEsTado.Equals(""), Nothing, IdEsTado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearProcesoOperaciones(ByVal sCodEmpresa As String, ByVal sDescripcion As String,
                                                 ByVal sEstado As String, ByVal sCodUsuario As String,
                                                 ByVal p_DataTable As DataTable) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_CrearProcesoOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ProcesoOrden", p_DataTable, ParameterDirection.Input, 253))

            'Dim param As New SqlParameter("@petyProcesoOrden", p_DataTable)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "TypeProcesoOpeOrden"
            'cmd.Parameters.Add(param)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodProcesoOpe", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CodProcesoOpe").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarProcesoOperaciones(ByVal sCodEmpresa As String, ByVal sCodProcesoOpe As String, ByVal sDescripcion As String,
                                                 ByVal sEstado As String, ByVal sCodUsuario As String,
                                                 ByVal p_DataTable As DataTable) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_ActualizarProcesoOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodProcesoOpe", sCodProcesoOpe, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ProcesoOrden", p_DataTable, ParameterDirection.Input, 253))

            'Dim param As New SqlParameter("@petyProcesoOrden", p_DataTable)
            'param.SqlDbType = SqlDbType.Structured
            'param.TypeName = "TypeProcesoOpeOrden"
            'cmd.Parameters.Add(param)

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarGrupoOperaciones(ByVal sCodEmpresa As String, ByVal sCodOperacion As String, ByVal sProcesoOpe As String, ByVal sEstado As String) As DataTable

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarProcesoOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", IIf(sCodEmpresa.Equals(""), Nothing, sCodEmpresa), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", IIf(sCodOperacion.Equals(""), Nothing, sCodOperacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodProcesoOpe", IIf(sProcesoOpe.Equals(""), Nothing, sProcesoOpe), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoOperacionesDet(ByVal empresa As String, ByVal cod_op_dep As String, ByVal item As String, ByVal estado As String, ByVal usuario As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_CambiarEstadoOperacionDetalle", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOPDep", cod_op_dep, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Item", item, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(estado.Equals(""), Nothing, estado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Respuesta", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_Respuesta").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
