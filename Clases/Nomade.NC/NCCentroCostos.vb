Public Class NCCentroCostos
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CREAR_REQUE_COMPRA(ByVal p_SOLICITA As String, ByVal p_FECHA As String, ByVal p_PRIORIDAD As String, _
                                               ByVal p_TIPOREQ As String, ByVal p_AREA As String, ByVal p_SECCION As String, _
                                               ByVal p_PROCESO As String, ByVal p_ACTIVIDAD As String, ByVal p_GLOSA As String, _
                                               ByVal p_CATALOGO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_REQUECOMPRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_SOLICITA", p_SOLICITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRIORIDAD", p_PRIORIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPOREQ", p_TIPOREQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AREA", p_AREA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SECCION", p_SECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROCESO", p_PROCESO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTIVIDAD", p_ACTIVIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODIGO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_CentroCostos_DATOS(ByVal p_PTVCECC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_DATOS_CENTROCOSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_PTVCECC_CODE, ParameterDirection.Input, 253))
           

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

    Public Function Listar_CentroCostos_Cabecera(ByVal p_PTVCECC_CODE As String, ByVal p_PTVCECC_CTLG_CODE As String, _
                                                 ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_USER As String, _
                                                 ByVal p_NIVELES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CENTRO_COSTOS_CABECERA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_CODE", p_PTVCECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_CTLG_CODE", p_PTVCECC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_ESTADO_IND", p_PTVCECC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_USER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVELES", p_NIVELES, ParameterDirection.Input, 253))

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

    Public Function Listar_CentroCostos_Detalle(ByVal p_PTVCECD_CODE As String, ByVal p_PTVCECD_CECC_CODE As String, ByVal p_PTVCECD_DEPEND_CODE As String, ByVal p_PTVCECD_NIVEL As Integer, ByVal p_PTVCECD_ESTADO_IND As String, _
                                                Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CENTRO_COSTOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_CODE", p_PTVCECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_CECC_CODE", p_PTVCECD_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DEPEND_CODE", p_PTVCECD_DEPEND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_NIVEL", p_PTVCECD_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_ESTADO_IND", p_PTVCECD_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

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

    Public Function fnListarCentroCostosCabecera(ByVal sCodEmpresa As String, ByVal sCodCentroCostosCab As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCen_ListarCentroCostosCab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosCab", IIf(sCodCentroCostosCab.Equals(""), Nothing, sCodCentroCostosCab), ParameterDirection.Input, 253))
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

    Public Function fnVerificarCentroCostos(ByVal p_ctlg As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("ECC_VERIFICAR_ESTADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_RPTA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCentroCostosDetalle(ByVal sCodEmpresa As String, ByVal sCodCentroCostosCab As String, ByVal sCodCentroCostosDet As String,
                                                ByVal sCodDependencia As String, ByVal iNivel As Integer, sEstado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCen_ListarCentroCostosDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@peCodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodCentroCostosCab", IIf(sCodCentroCostosCab.Equals(""), Nothing, sCodCentroCostosCab), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@peCodCentroCostosDet", IIf(sCodCentroCostosDet.Equals(""), Nothing, sCodCentroCostosDet), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pecDependencia", IIf(sCodDependencia.Equals(""), Nothing, sCodDependencia), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@peiNivel", IIf(iNivel = 0, Nothing, iNivel), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@pebEstado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

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

    ''' <summary>
    ''' Anterior procedimiento de creación de Centro de Costos
    ''' </summary>
    ''' <param name="p_PTVCECC_CTLG_CODE"></param>
    ''' <param name="p_PTVCECC_NOMBRE_PLAN"></param>
    ''' <param name="p_PTVCECC_NIVELES"></param>
    ''' <param name="p_PTVCECC_NIVEL1"></param>
    ''' <param name="p_PTVCECC_NIVEL1_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL2"></param>
    ''' <param name="p_PTVCECC_NIVEL2_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL3"></param>
    ''' <param name="p_PTVCECC_NIVEL3_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL4"></param>
    ''' <param name="p_PTVCECC_NIVEL4_DIG"></param>
    ''' <param name="p_PTVCECC_ESTADO_IND"></param>
    ''' <param name="p_PTVCECC_FECHA_INICIO"></param>
    ''' <param name="p_PTVCECC_FECHA_FIN"></param>
    ''' <param name="p_PTVCECC_USUA_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Crear_CentroCostos_Cabecera(ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_PTVCECC_NIVEL1 As String, ByVal p_PTVCECC_NIVEL1_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL2 As String, ByVal p_PTVCECC_NIVEL2_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL3 As String, ByVal p_PTVCECC_NIVEL3_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL4 As String, ByVal p_PTVCECC_NIVEL4_DIG As Integer,
                                                ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String, ByVal p_PTVCECC_FECHA_FIN As String, ByVal p_PTVCECC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CENTRO_COSTOS_CABECERA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_CTLG_CODE", p_PTVCECC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NOMBRE_PLAN", p_PTVCECC_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVELES", p_PTVCECC_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL1", p_PTVCECC_NIVEL1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL1_DIG", p_PTVCECC_NIVEL1_DIG, ParameterDirection.Input, 253))
            If p_PTVCECC_NIVEL2 = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2", p_PTVCECC_NIVEL2, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL2_DIG = 0 Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2_DIG", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2_DIG", p_PTVCECC_NIVEL2_DIG, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL3 = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3", p_PTVCECC_NIVEL3, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL3_DIG = 0 Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3_DIG", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3_DIG", p_PTVCECC_NIVEL3_DIG, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL4", p_PTVCECC_NIVEL4, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL4_DIG", p_PTVCECC_NIVEL4_DIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_ESTADO_IND", p_PTVCECC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_USUA_ID", p_PTVCECC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_INICIO", p_PTVCECC_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_PTVCECC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_FIN", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_FIN", p_PTVCECC_FECHA_FIN, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' Nuevo procedimiento de Creado de Cabecera de Centro de Costos
    ''' </summary>
    ''' <param name="p_PTVCECC_CTLG_CODE">empresa</param>
    ''' <param name="p_PTVCECC_NOMBRE_PLAN">nombre de centro de costos</param>
    ''' <param name="p_PTVCECC_NIVELES">niveles del centro de costos</param>
    ''' <param name="p_DIGITOS_NIVEL">digitos de niveles(concatenados por comas)</param>
    ''' <param name="p_PTVCECC_ESTADO_IND">estado del registro</param>
    ''' <param name="p_PTVCECC_FECHA_INICIO">fecha inicio de uso de la nueva estructura de centro costos</param>
    ''' <param name="p_PTVCECC_FECHA_FIN">fecha fin de utilización de estructura de centro costos</param>
    ''' <param name="p_PTVCECC_USUA_ID">usuario de creación de la nueva estructura</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Crear_CentroCostos_CabeceraCab(ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_DIGITOS_NIVEL As String, ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String,
                                                ByVal p_PTVCECC_FECHA_FIN As String, ByVal p_PTVCECC_USUA_ID As String, ByVal p_NOMBRES_NIVEL As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpCen_CrearCentroCostosCab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Empresa", p_PTVCECC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nombre", p_PTVCECC_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Niveles", p_PTVCECC_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DigitosNivel", p_DIGITOS_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EstadoInd", p_PTVCECC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_PTVCECC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaInicio", p_PTVCECC_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_PTVCECC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFin", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFin", p_PTVCECC_FECHA_FIN, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_Codigo", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NombresNivel", p_NOMBRES_NIVEL, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_Codigo").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' Anterior procedimiento para actualiar centro de costos
    ''' </summary>
    ''' <param name="p_PTVCECC_CODE"></param>
    ''' <param name="p_PTVCECC_CTLG_CODE"></param>
    ''' <param name="p_PTVCECC_NOMBRE_PLAN"></param>
    ''' <param name="p_PTVCECC_NIVELES"></param>
    ''' <param name="p_PTVCECC_NIVEL1"></param>
    ''' <param name="p_PTVCECC_NIVEL1_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL2"></param>
    ''' <param name="p_PTVCECC_NIVEL2_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL3"></param>
    ''' <param name="p_PTVCECC_NIVEL3_DIG"></param>
    ''' <param name="p_PTVCECC_NIVEL4"></param>
    ''' <param name="p_PTVCECC_NIVEL4_DIG"></param>
    ''' <param name="p_PTVCECC_ESTADO_IND"></param>
    ''' <param name="p_PTVCECC_FECHA_INICIO"></param>
    ''' <param name="p_PTVCECC_FECHA_FIN"></param>
    ''' <param name="p_PTVCECC_USUA_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Actualizar_CentroCostos_Cabecera(ByVal p_PTVCECC_CODE As String, ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_PTVCECC_NIVEL1 As String, ByVal p_PTVCECC_NIVEL1_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL2 As String, ByVal p_PTVCECC_NIVEL2_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL3 As String, ByVal p_PTVCECC_NIVEL3_DIG As Integer,
                                                ByVal p_PTVCECC_NIVEL4 As String, ByVal p_PTVCECC_NIVEL4_DIG As Integer,
                                                ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String, ByVal p_PTVCECC_FECHA_FIN As String, ByVal p_PTVCECC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CENTRO_COSTOS_CABECERA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_CODE", p_PTVCECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_CTLG_CODE", p_PTVCECC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NOMBRE_PLAN", p_PTVCECC_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVELES", p_PTVCECC_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL1", p_PTVCECC_NIVEL1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL1_DIG", p_PTVCECC_NIVEL1_DIG, ParameterDirection.Input, 253))
            If p_PTVCECC_NIVEL2 = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2", p_PTVCECC_NIVEL2, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL2_DIG = 0 Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2_DIG", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL2_DIG", p_PTVCECC_NIVEL2_DIG, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL3 = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3", p_PTVCECC_NIVEL3, ParameterDirection.Input, 253))
            End If
            If p_PTVCECC_NIVEL3_DIG = 0 Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3_DIG", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL3_DIG", p_PTVCECC_NIVEL3_DIG, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL4", p_PTVCECC_NIVEL4, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_NIVEL4_DIG", p_PTVCECC_NIVEL4_DIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_ESTADO_IND", p_PTVCECC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_USUA_ID", p_PTVCECC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_INICIO", p_PTVCECC_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_PTVCECC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_FIN", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECC_FECHA_FIN", p_PTVCECC_FECHA_FIN, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' Nuevo procedimiento para actualización de Centro de Costos
    ''' </summary>
    ''' <param name="p_PTVCECC_CODE">codigo del centro costos</param>
    ''' <param name="p_PTVCECC_CTLG_CODE">empresa</param>
    ''' <param name="p_PTVCECC_NOMBRE_PLAN">nuevo nombre</param>
    ''' <param name="p_PTVCECC_NIVELES">niveles</param>
    ''' <param name="p_DIGITOS_NIVEL">digitos x nivel</param>
    ''' <param name="p_PTVCECC_ESTADO_IND">estado registro</param>
    ''' <param name="p_PTVCECC_FECHA_INICIO">inicio de uso</param>
    ''' <param name="p_PTVCECC_FECHA_FIN">fin de uso</param>
    ''' <param name="p_PTVCECC_USUA_ID">usuario de creación</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Actualizar_CentroCostos_Cabecera(ByVal p_PTVCECC_CODE As String, ByVal p_PTVCECC_CTLG_CODE As String, ByVal p_PTVCECC_NOMBRE_PLAN As String, ByVal p_PTVCECC_NIVELES As Integer,
                                                ByVal p_DIGITOS_NIVEL As String, ByVal p_PTVCECC_ESTADO_IND As String, ByVal p_PTVCECC_FECHA_INICIO As String, ByVal p_PTVCECC_FECHA_FIN As String,
                                                ByVal p_PTVCECC_USUA_ID As String, ByVal p_NOMBRES_NIVEL As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpCen_ActualizarCentroCostosCab", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Codigo", p_PTVCECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Empresa", p_PTVCECC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nombre", p_PTVCECC_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Niveles", p_PTVCECC_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DigitosNivel", p_DIGITOS_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EstadoInd", p_PTVCECC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_PTVCECC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaInicio", p_PTVCECC_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_PTVCECC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFin", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFin", p_PTVCECC_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_Tipo", 1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoGenerado", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_respuesta", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NombresNivel", p_NOMBRES_NIVEL, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_CodigoGenerado").Value
            msg(1) = cmd1.Parameters("@p_respuesta").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_CentroCostos_Detalle(ByVal p_PTVCECD_CECC_CODE As String, ByVal p_PTVCECD_DESC As String, ByVal p_PTVCECD_DEPEND_CODE As String, _
                                               ByVal p_PTVCECD_NIVEL As Integer, ByVal p_PTVCECD_ESTADO_IND As String, ByVal p_PTVCECD_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CENTRO_COSTOS_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_CECC_CODE", p_PTVCECD_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DESC", p_PTVCECD_DESC, ParameterDirection.Input, 253))
            If p_PTVCECD_DEPEND_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DEPEND_CODE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DEPEND_CODE", p_PTVCECD_DEPEND_CODE, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_NIVEL", p_PTVCECD_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_ESTADO_IND", p_PTVCECD_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_USUA_ID", p_PTVCECD_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_CentroCostos_Detalle(ByVal p_PTVCECD_CODE As String, ByVal p_PTVCECD_CECC_CODE As String, ByVal p_PTVCECD_DESC As String, ByVal p_PTVCECD_DEPEND_CODE As String, _
                                               ByVal p_PTVCECD_NIVEL As Integer, ByVal p_PTVCECD_ESTADO_IND As String, ByVal p_PTVCECD_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CENTRO_COSTOS_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_CODE", p_PTVCECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_CECC_CODE", p_PTVCECD_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DESC", p_PTVCECD_DESC, ParameterDirection.Input, 253))
            If p_PTVCECD_DEPEND_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DEPEND_CODE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_DEPEND_CODE", p_PTVCECD_DEPEND_CODE, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_NIVEL", p_PTVCECD_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_ESTADO_IND", p_PTVCECD_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCECD_USUA_ID", p_PTVCECD_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    '------------ DETALLE DE CENTRO COSTOS (nuevos procedimientos) ------------
    Public Function fnCrearCentroCostosDetalle(ByVal sCodEmpresa As String, ByVal sCodCentroCostosCab As String, ByVal sDescripcion As String,
                                              ByVal sCodDepencia As String, ByVal iNivel As Integer, ByVal sEstado As String,
                                              ByVal sCodUsuario As String, ByVal sAbreviatura As String) As Array
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCen_CrearCentroCostosDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosCab", sCodCentroCostosCab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Dependencia", IIf(sCodDepencia.Equals(""), Nothing, sCodDepencia), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nivel", iNivel, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosDet", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Abreviatura", sAbreviatura, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            Dim msg(2) As String
            msg(0) = cmd.Parameters("@p_CodCentroCostosDet").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnActualizarCentroCostosDetalle(ByVal sCodCentroCostosCab As String, ByVal sCodCentroCostosDet As String,
                                                    ByVal sDescripcion As String, ByVal sCodDependencia As String, ByVal iNivel As Integer,
                                                    ByVal sEstado As String, ByVal sCodUsuario As String, ByVal sAbreviatura As String) As Array
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCen_ActualizarCentroCostosDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosCab", sCodCentroCostosCab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosDet", sCodCentroCostosDet, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Dependencia", IIf(sCodDependencia.Equals(""), Nothing, sCodDependencia), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Nivel", iNivel, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Abreviatura", sAbreviatura, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            Dim msg(2) As String
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCentroCostosArbol(ByVal sCodEmpresa As String, ByVal sCodCentCostCab As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCentroCostosArbol", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCosCab", sCodCentCostCab, ParameterDirection.Input, 253))
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

    Public Function fnListarNivelesCostosArbol(ByVal sCodCentCostCab As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("CC_LISTAR_NIVELES_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCosCab", sCodCentCostCab, ParameterDirection.Input, 253))

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

    Public Function fnListaCentroCostosDet(ByVal sCodEmpresa As String, ByVal sCodCentroCostosCab As String, ByVal sCodCentroCostosDet As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCentroCostosDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosCab", sCodCentroCostosCab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostosDet", IIf(sCodCentroCostosDet = "", Nothing, sCodCentroCostosDet), ParameterDirection.Input, 253))
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

    Public Function fnGetCentroCostoActivo(ByVal sCodEmpresa As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetCentroCostoActivo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))

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

End Class
