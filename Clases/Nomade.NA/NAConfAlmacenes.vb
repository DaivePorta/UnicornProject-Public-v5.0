Public Class NAConfAlmacenes

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarAlmacenes(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO As String, Optional ByVal p_TIPO As String = "0",
                                     Optional ByVal p_CODE_ALMC As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_ALMACENES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ALMC", p_CODE_ALMC, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAlmacenesUsuario(ByVal P_USUA_ID As String, ByVal P_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_ALMACEN_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAlmacenesSucursal(ByVal P_USUA_ID As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_ALMACEN_SUCURSAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarEmpleados(ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFA_LISTAR_EMPLEADOS_ACTIVOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPR", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CambiarEstadoAlmacenes(ByVal p_CODE As String) As Array
        Try

            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PFA_CAMBIAR_ESTADO_ALMACENES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ActualizarAlmacenes(ByVal p_codigo As String, ByVal p_ctlg_code As String,
                                   ByVal p_scsl_code As String, ByVal p_desc As String, ByVal p_TIPO_ALMC As String,
                                   ByVal p_encargado As String, ByVal p_direccion As String,
                                   ByVal p_pais_code As String, ByVal p_ubige_code As String,
                                   ByVal p_urbanizacion As String, ByVal p_numero_tele As String, ByVal p_anexo_tele As String,
                                   ByVal p_fecha_inicio As String, ByVal p_fecha_termino As String, ByVal p_IMPR_CODE As String,
                                   ByVal p_estado_ind As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_ALMACENES", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMC", p_TIPO_ALMC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENCARGADO", p_encargado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_direccion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS_CODE", p_pais_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGE_CODE", p_ubige_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBAN", p_urbanizacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_TELE", p_numero_tele, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANEXO_TELE", p_anexo_tele, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))
            If p_fecha_termino = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", p_fecha_termino, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearAlmacenes(ByVal p_ctlg_code As String,
                                   ByVal p_scsl_code As String, ByVal p_desc As String, ByVal p_TIPO_ALMC As String,
                                   ByVal p_encargado As String, ByVal p_direccion As String,
                                   ByVal p_pais_code As String, ByVal p_ubige_code As String,
                                   ByVal p_urbanizacion As String, ByVal p_numero_tele As String, ByVal p_anexo_tele As String,
                                   ByVal p_fecha_inicio As String, ByVal p_fecha_termino As String, ByVal p_IMPR_CODE As String,
                                   ByVal p_estado_ind As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_ALMACENES", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ALMC", p_TIPO_ALMC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENCARGADO", p_encargado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_direccion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS_CODE", p_pais_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGE_CODE", p_ubige_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBAN", p_urbanizacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_TELE", p_numero_tele, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANEXO_TELE", p_anexo_tele, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))
            If p_fecha_termino = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TERMINO", p_fecha_termino, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function fVisuaiizaGR(ByVal p_Almacen As String, ByVal P_FechaInicial As String, ByVal p_FechaFinal As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("sp_GR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_almacen", p_Almacen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaInicial", P_FechaInicial, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFinal", p_FechaFinal, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function


End Class
